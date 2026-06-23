(function () {
  const ids = {
    crops: ['dashboardActiveCrops', 'dashboardActiveCropsNote'],
    water: ['dashboardWaterUsage', 'dashboardWaterUsageNote'],
    revenue: ['dashboardEstimatedRevenue', 'dashboardEstimatedRevenueNote'],
    alerts: ['dashboardActiveAlerts', 'dashboardActiveAlertsNote'],
  };

  function element(id) {
    return document.getElementById(id);
  }

  function setMetric(metric, value, note, tone = '') {
    const [valueId, noteId] = ids[metric];
    const valueElement = element(valueId);
    const noteElement = element(noteId);
    if (!valueElement || !noteElement) return;
    valueElement.textContent = value;
    valueElement.classList.remove('dashboard-stat-loading');
    noteElement.textContent = note;
    noteElement.className = `stat-change${tone ? ` ${tone}` : ''}`;
  }

  function storedProfileCrops() {
    try {
      const user = typeof getStoredUser === 'function'
        ? getStoredUser()
        : JSON.parse(localStorage.getItem('agri_user') || '{}');
      return String(user?.primary_crops || user?.primaryCrops || '')
        .split(',')
        .map(crop => crop.trim())
        .filter(Boolean);
    } catch (error) {
      return [];
    }
  }

  function storedUser() {
    try {
      return typeof getStoredUser === 'function'
        ? (getStoredUser() || {})
        : JSON.parse(localStorage.getItem('agri_user') || '{}');
    } catch (error) {
      return {};
    }
  }

  async function loadActiveCrops() {
    const fallbackCrops = storedProfileCrops();
    try {
      const crops = await apiFetch('/farm/crops');
      const records = Array.isArray(crops) ? crops : [];
      const active = records.filter(crop => String(crop.status || 'Active').toLowerCase() === 'active');
      if (records.length) {
        setMetric('crops', String(active.length), `${records.length} crop record${records.length === 1 ? '' : 's'} saved`, active.length ? 'up' : '');
        return;
      }
    } catch (error) {
      // Profile crops are a valid fallback when formal crop records are unavailable.
    }

    setMetric(
      'crops',
      String(fallbackCrops.length),
      fallbackCrops.length ? 'Based on your farm profile' : 'Add crops in your profile',
      fallbackCrops.length ? 'up' : ''
    );
  }

  function parseQuantityInQuintals(value) {
    const text = String(value ?? '').trim().toLowerCase();
    const match = text.replace(/,/g, '').match(/\d+(?:\.\d+)?/);
    const amount = Number.parseFloat(match?.[0] || '');
    if (!Number.isFinite(amount) || amount < 0) return 0;
    if (/\bkg\b|kilogram/.test(text)) return amount / 100;
    if (/\bton(?:ne)?s?\b|\bmt\b/.test(text)) return amount * 10;
    return amount;
  }

  function formatCurrency(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return 'Rs.0';
    if (amount >= 10000000) return `Rs.${(amount / 10000000).toFixed(amount >= 100000000 ? 0 : 1)}Cr`;
    if (amount >= 100000) return `Rs.${(amount / 100000).toFixed(amount >= 1000000 ? 0 : 1)}L`;
    if (amount >= 1000) return `Rs.${(amount / 1000).toFixed(amount >= 10000 ? 0 : 1)}K`;
    return `Rs.${Math.round(amount).toLocaleString('en-IN')}`;
  }

  async function loadEstimatedRevenue() {
    try {
      const listings = await apiFetch('/market/my-listings');
      const records = Array.isArray(listings) ? listings : [];
      const estimate = records.reduce((sum, listing) => {
        const pricePerQuintal = Number(listing.price);
        return sum + (Number.isFinite(pricePerQuintal) ? pricePerQuintal * parseQuantityInQuintals(listing.quantity) : 0);
      }, 0);
      setMetric(
        'revenue',
        formatCurrency(estimate),
        records.length ? `Potential value of ${records.length} marketplace listing${records.length === 1 ? '' : 's'}` : 'No marketplace listings yet',
        estimate > 0 ? 'up' : ''
      );
    } catch (error) {
      setMetric('revenue', 'Unavailable', 'Could not load marketplace value');
    }
  }

  function parseFarmAreaAcres(value) {
    const text = String(value || '').trim().toLowerCase();
    const amount = Number.parseFloat(text.replace(/,/g, '').match(/\d+(?:\.\d+)?/)?.[0] || '');
    if (!Number.isFinite(amount) || amount <= 0) return 0;
    if (/hectare|\bha\b/.test(text)) return amount * 2.47105;
    return amount;
  }

  function cropWaterDepth(crop) {
    const depths = {
      rice: 7,
      paddy: 7,
      sugarcane: 6,
      banana: 6,
      potato: 4.5,
      onion: 4,
      tomato: 4.5,
      cabbage: 4,
      carrot: 3.5,
      wheat: 3.5,
      maize: 4,
      cotton: 4,
      soybean: 3.5,
      chickpea: 2.5,
      gram: 2.5,
      mustard: 2.5,
    };
    return depths[String(crop || '').trim().toLowerCase()] || 3.5;
  }

  function formatWaterLitres(value) {
    if (value >= 100000) return `${(value / 100000).toFixed(1)} lakh L`;
    if (value >= 1000) return `${Math.round(value / 1000)}K L`;
    return `${Math.round(value).toLocaleString('en-IN')} L`;
  }

  async function loadWaterEstimate() {
    const user = storedUser();
    const areaAcres = parseFarmAreaAcres(user.total_area || user.totalArea);
    const crops = storedProfileCrops();
    if (!areaAcres) {
      setMetric('water', 'Add farm area', 'Update acreage in My Profile');
      return;
    }

    const averageDepthMm = crops.length
      ? crops.reduce((sum, crop) => sum + cropWaterDepth(crop), 0) / crops.length
      : 3.5;
    let weatherMultiplier = 1;
    let weatherNote = 'normal weather';

    try {
      const city = user.district || user.village || 'Pune';
      const weather = await apiFetch(`/weather/current?city=${encodeURIComponent(city)}`);
      const condition = String(weather.condition || '').toLowerCase();
      const temperature = Number(weather.temperature);
      const humidity = Number(weather.humidity);
      if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('storm') || humidity >= 82) {
        weatherMultiplier = 0;
        weatherNote = 'rain/high humidity: irrigation on hold';
      } else if (temperature >= 34 || humidity < 35) {
        weatherMultiplier = 1.2;
        weatherNote = 'increased for hot or dry weather';
      } else if (temperature <= 18) {
        weatherMultiplier = 0.8;
        weatherNote = 'reduced for cool weather';
      }
    } catch (error) {
      weatherNote = 'using standard crop requirement';
    }

    // One acre receiving one millimetre of water requires about 4,047 litres.
    const estimatedLitres = areaAcres * averageDepthMm * 4046.86 * weatherMultiplier;
    setMetric(
      'water',
      weatherMultiplier === 0 ? 'Irrigation hold' : formatWaterLitres(estimatedLitres),
      `Today for ${areaAcres.toLocaleString('en-IN')} acres; ${weatherNote}`,
      weatherMultiplier === 0 ? 'up' : weatherMultiplier > 1 ? 'down' : ''
    );
  }

  function updateAlertSummary(detail) {
    const alerts = Array.isArray(detail?.alerts)
      ? detail.alerts
      : Array.from(document.querySelectorAll('#dashboardLiveAlertsList .dashboard-live-alert')).map(node => ({
          tone: node.classList.contains('alert-danger') ? 'danger' : node.classList.contains('alert-warning') ? 'warning' : 'normal',
        }));
    const urgent = alerts.filter(alert => ['danger', 'warning'].includes(alert.tone)).length;
    setMetric(
      'alerts',
      String(alerts.length),
      urgent ? `${urgent} need attention now` : alerts.length ? 'Live checks are stable' : 'No active alerts',
      urgent ? 'down' : 'up'
    );
  }

  function observeLiveSections() {
    const waterList = element('dashboardWaterList');
    const alertsList = element('dashboardLiveAlertsList');
    if (alertsList) new MutationObserver(() => updateAlertSummary()).observe(alertsList, { childList: true, subtree: true });
  }

  async function loadDashboardSummary() {
    if (typeof apiFetch !== 'function') return;
    updateAlertSummary();
    await Promise.allSettled([loadActiveCrops(), loadWaterEstimate(), loadEstimatedRevenue()]);
  }

  window.addEventListener('agri:dashboard-alerts', event => updateAlertSummary(event.detail));
  document.addEventListener('DOMContentLoaded', () => {
    observeLiveSections();
    loadDashboardSummary();
  });
}());
