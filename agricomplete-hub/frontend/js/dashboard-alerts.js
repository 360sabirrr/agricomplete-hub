(function () {
  const DEFAULT_CITY = 'Pune';
  const DEFAULT_STATE = 'Maharashtra';
  const DEFAULT_COMMODITY = 'Onion';

  function element(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[char]));
  }

  function formatPrice(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return 'Rs.--';
    return `Rs.${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}/q`;
  }

  function timeAgo(dateValue) {
    const date = dateValue ? new Date(dateValue) : new Date();
    if (Number.isNaN(date.getTime())) return 'Just now';
    const minutes = Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
    if (minutes < 2) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.round(hours / 24)}d ago`;
  }

  function alertHtml(alert) {
    return `
      <article class="dashboard-live-alert alert-${alert.tone}">
        <div class="dashboard-live-alert-icon"><i class="fas ${alert.icon}"></i></div>
        <div class="dashboard-live-alert-copy">
          <div class="dashboard-live-alert-row">
            <span>${escapeHtml(alert.type)}</span>
            <time>${escapeHtml(alert.time || 'Live')}</time>
          </div>
          <h5>${escapeHtml(alert.title)}</h5>
          <p>${escapeHtml(alert.message)}</p>
        </div>
      </article>
    `;
  }

  function renderAlerts(alerts) {
    const list = element('dashboardLiveAlertsList');
    if (!list) return;
    if (!alerts.length) {
      list.innerHTML = `
        <div class="dashboard-live-alerts-empty">
          <i class="fas fa-check-circle"></i>
          <strong>No active alerts</strong>
          <span>Weather, mandi, disease, and water checks are clear right now.</span>
        </div>
      `;
      window.dispatchEvent(new CustomEvent('agri:dashboard-alerts', { detail: { alerts: [] } }));
      return;
    }
    list.innerHTML = alerts.map(alertHtml).join('');
    window.dispatchEvent(new CustomEvent('agri:dashboard-alerts', { detail: { alerts } }));
  }

  function fallbackAlert(type, icon, tone, title, message) {
    return { type, icon, tone, title, message, time: 'Live' };
  }

  async function buildWeatherAlerts() {
    try {
      const city = element('weatherCityInput')?.value?.trim() || DEFAULT_CITY;
      const data = await apiFetch(`/weather/current?city=${encodeURIComponent(city)}`);
      const condition = String(data.condition || 'Weather update');
      const temp = Number(data.temperature);
      const humidity = Number(data.humidity);
      const wind = Number(data.wind_kph);
      const lower = condition.toLowerCase();
      const alerts = [];

      const weatherTone = lower.includes('rain') || lower.includes('storm') ? 'warning' : temp > 34 ? 'danger' : 'info';
      alerts.push({
        type: 'Weather',
        icon: lower.includes('rain') ? 'fa-cloud-showers-heavy' : 'fa-cloud-sun',
        tone: weatherTone,
        title: `${data.location || city}: ${condition}`,
        message: `Temperature ${Number.isFinite(temp) ? `${Math.round(temp)} C` : '--'}, humidity ${Number.isFinite(humidity) ? `${humidity}%` : '--'}, wind ${Number.isFinite(wind) ? `${wind.toFixed(1)} km/h` : '--'}.`,
        time: 'Live',
      });

      let waterMessage = 'Standard irrigation cycle is suitable. Keep checking soil moisture before watering.';
      let waterTone = 'success';
      if (lower.includes('rain') || lower.includes('drizzle') || humidity >= 82) {
        waterMessage = 'Postpone irrigation. Rain or high humidity can cause excess soil moisture.';
        waterTone = 'info';
      } else if (temp >= 33 || humidity < 35) {
        waterMessage = 'Water early morning or late evening to reduce evaporation loss.';
        waterTone = 'warning';
      }
      alerts.push({
        type: 'Water',
        icon: 'fa-tint',
        tone: waterTone,
        title: 'Irrigation guidance',
        message: waterMessage,
        time: 'Live',
      });

      return alerts;
    } catch (error) {
      return [
        fallbackAlert('Weather', 'fa-cloud-sun', 'info', 'Weather check pending', 'Could not load live weather. Use the refresh button after the backend responds.'),
        fallbackAlert('Water', 'fa-tint', 'info', 'Water guidance pending', 'Irrigation advice will update after weather data loads.'),
      ];
    }
  }

  async function buildMarketAlert() {
    try {
      const params = new URLSearchParams({ state: DEFAULT_STATE, commodity: DEFAULT_COMMODITY, limit: '20' });
      const data = await apiFetch(`/market-prices?${params.toString()}`);
      const records = Array.isArray(data.records) ? data.records : [];
      const priced = records.filter(record => Number.isFinite(Number(record.modal_price)));
      if (!priced.length) {
        return fallbackAlert('Market', 'fa-chart-line', 'warning', 'Mandi data unavailable', 'No live mandi records found for the default crop right now.');
      }
      const best = priced.reduce((top, record) => Number(record.modal_price) > Number(top.modal_price) ? record : top, priced[0]);
      const avg = priced.reduce((sum, record) => sum + Number(record.modal_price), 0) / priced.length;
      return {
        type: 'Market',
        icon: 'fa-chart-line',
        tone: 'success',
        title: `${best.commodity || DEFAULT_COMMODITY} best modal price`,
        message: `${formatPrice(best.modal_price)} at ${best.market || 'available market'}, ${best.district || DEFAULT_STATE}. Average modal price: ${formatPrice(avg)}.`,
        time: 'Live',
      };
    } catch (error) {
      return fallbackAlert('Market', 'fa-chart-line', 'warning', 'Market alert pending', 'Could not load live mandi prices. Check Data.gov.in API configuration if this continues.');
    }
  }

  function localDiseaseScans() {
    try {
      const scans = JSON.parse(localStorage.getItem('agri_recent_disease_scans') || '[]');
      return Array.isArray(scans) ? scans : [];
    } catch (error) {
      return [];
    }
  }

  async function buildDiseaseAlert() {
    try {
      let scans = [];
      if (localStorage.getItem('agri_token')) {
        const data = await apiFetch('/disease/scans?limit=1');
        scans = Array.isArray(data.scans) ? data.scans : [];
      }
      if (!scans.length) scans = localDiseaseScans();
      const latest = scans[0];
      if (!latest) {
        return fallbackAlert('Disease', 'fa-leaf', 'info', 'No recent disease scan', 'Upload a leaf image on Disease Detection to receive crop health alerts here.');
      }
      const name = latest.name || latest.disease || latest.class_name || 'Detected disease';
      const confidence = Number(latest.confidence);
      return {
        type: 'Disease',
        icon: 'fa-bug',
        tone: confidence >= 75 ? 'danger' : 'warning',
        title: `Recent scan: ${name}`,
        message: `AI confidence ${Number.isFinite(confidence) ? `${confidence.toFixed(1)}%` : 'not available'}. Review treatment advice if symptoms match your field.`,
        time: timeAgo(latest.created_at),
      };
    } catch (error) {
      return fallbackAlert('Disease', 'fa-leaf', 'info', 'Disease scan alert pending', 'Recent scan history will appear after Disease Detection loads.');
    }
  }

  async function loadDashboardLiveAlerts() {
    const list = element('dashboardLiveAlertsList');
    const refresh = element('dashboardLiveAlertsRefresh');
    if (!list || typeof apiFetch !== 'function') return;

    if (refresh) refresh.disabled = true;
    list.innerHTML = '<div class="dashboard-live-alerts-loading"><i class="fas fa-spinner fa-spin"></i> Loading live alerts...</div>';

    try {
      const [market, weatherAlerts, disease] = await Promise.all([
        buildMarketAlert(),
        buildWeatherAlerts(),
        buildDiseaseAlert(),
      ]);
      renderAlerts([market, ...weatherAlerts, disease]);
    } finally {
      if (refresh) refresh.disabled = false;
    }
  }

  window.loadDashboardLiveAlerts = loadDashboardLiveAlerts;

  document.addEventListener('DOMContentLoaded', () => {
    if (!element('dashboardLiveAlertsList')) return;
    element('dashboardLiveAlertsRefresh')?.addEventListener('click', loadDashboardLiveAlerts);
    loadDashboardLiveAlerts();
  });
}());
