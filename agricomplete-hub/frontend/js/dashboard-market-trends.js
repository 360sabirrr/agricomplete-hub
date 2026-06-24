(function () {
  const DEFAULT_STATE = 'Maharashtra';
  const DEFAULT_COMMODITY = 'Onion';
  const DEFAULT_LIMIT = '80';

  let liveRecords = [];
  let activePeriod = '1W';
  let activeCommodity = DEFAULT_COMMODITY;
  let isLoading = false;

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
    return `Rs.${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  }

  function formatCompactPrice(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return '--';
    if (Math.abs(amount) >= 1000) {
      const thousands = amount / 1000;
      return `${thousands.toFixed(thousands >= 10 ? 0 : 1).replace(/\.0$/, '')}k`;
    }
    return Math.round(amount).toString();
  }

  function parseMandiDate(value) {
    if (!value) return null;
    const text = String(value).trim();
    const slashMatch = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (slashMatch) {
      const [, day, month, year] = slashMatch;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    const date = new Date(text);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function daysForPeriod(period) {
    return { '1W': 7, '1M': 31, '3M': 93, '1Y': 366 }[period] || 7;
  }

  function selectedCommodityFromValue(value) {
    const cropSelect = element('priceTrendCrop');
    const option = Array.from(cropSelect?.options || []).find(item => item.value === value);
    return option?.textContent?.trim() || value || activeCommodity;
  }

  function shortLabel(record, index) {
    const label = String(record.market || record.arrival_date || `Mandi ${index + 1}`)
      .replace(/\s+APMC\b/gi, '')
      .replace(/\([^)]*\)/g, '')
      .trim();
    return label.length > 10 ? `${label.slice(0, 9)}...` : label;
  }

  function sampleForChart(records) {
    const maxBars = window.matchMedia('(max-width: 768px)').matches ? 6 : 10;
    if (records.length <= maxBars) return records;
    return Array.from({ length: maxBars }, (_, index) => {
      const sourceIndex = Math.round(index * (records.length - 1) / (maxBars - 1));
      return records[sourceIndex];
    });
  }

  function updateNote(text) {
    const note = element('priceTrendSourceNote');
    if (note) note.textContent = text;
  }

  function clearTrend(message) {
    const chartGroup = element('priceTrendBars');
    if (chartGroup) {
      chartGroup.innerHTML = `
        <div class="mandi-empty price-trend-empty">
          <i class="fas fa-chart-line"></i>
          <strong>No live trend data</strong>
          <span>${escapeHtml(message)}</span>
        </div>
      `;
    }

    const averageLine = element('priceTrendAverageLine');
    if (averageLine) {
      averageLine.style.setProperty('--avg-position', '50%');
      const label = averageLine.querySelector('span');
      if (label) label.textContent = 'Avg';
    }

    const currentEl = element('priceTrendCurrent');
    const averageEl = element('priceTrendAverage');
    const changeEl = element('priceTrendChange');
    const insightEl = element('priceTrendInsight');
    if (currentEl) currentEl.textContent = 'Rs.--';
    if (averageEl) averageEl.textContent = 'Rs.--';
    if (changeEl) {
      changeEl.className = 'trend-flat';
      changeEl.textContent = '--';
    }
    if (insightEl) insightEl.textContent = message;
  }

  function getRecordsForPeriod(period, commodity) {
    const expected = String(commodity || '').toLowerCase();
    const limits = { '1W': 7, '1M': 12, '3M': 18, '1Y': 28 };
    const usable = liveRecords
      .filter(record => !expected || String(record.commodity || '').toLowerCase() === expected)
      .map((record, index) => ({
        ...record,
        _index: index,
        _value: Number(record.modal_price),
        _date: parseMandiDate(record.arrival_date),
      }))
      .filter(record => Number.isFinite(record._value));

    const dated = usable.filter(record => record._date);
    if (dated.length > 1) {
      const latest = Math.max(...dated.map(record => record._date.getTime()));
      const cutoff = latest - daysForPeriod(period) * 24 * 60 * 60 * 1000;
      const filtered = dated
        .filter(record => record._date.getTime() >= cutoff)
        .sort((a, b) => a._date - b._date || a._index - b._index);
      if (filtered.length) return filtered.slice(-(limits[period] || 7));
    }

    return usable.slice(0, limits[period] || 7);
  }

  function renderLiveDashboardTrend(period, crop) {
    const chartGroup = element('priceTrendBars');
    if (!chartGroup) return false;

    activePeriod = period || activePeriod || '1W';
    const commodity = selectedCommodityFromValue(crop || activeCommodity || DEFAULT_COMMODITY);
    activeCommodity = commodity;

    if (isLoading) {
      clearTrend(`Loading live ${commodity} mandi prices...`);
      return true;
    }

    if (!liveRecords.length) {
      clearTrend('Live mandi prices will appear here after dashboard data loads.');
      return true;
    }

    const records = getRecordsForPeriod(activePeriod, commodity);
    if (!records.length) {
      clearTrend(`No live ${commodity} records found for ${DEFAULT_STATE}.`);
      return true;
    }

    const values = records.map(record => record._value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
    const first = values[0];
    const last = values[values.length - 1];
    const range = max - min || 1;
    const change = first ? ((last - first) / first) * 100 : 0;
    const avgPosition = 28 + ((avg - min) / range) * 64;

    const chartRecords = sampleForChart(records);
    chartGroup.dataset.visibleBars = String(chartRecords.length);
    chartGroup.innerHTML = chartRecords.map((record, index) => {
      const height = 32 + ((record._value - min) / range) * 66;
      const stateClass = record._value === max ? ' is-high' : record._value === min ? ' is-low' : '';
      const title = `${commodity} | ${record.market || 'Market'} | ${record.arrival_date || 'Latest'}: ${formatPrice(record._value)}`;
      return `
        <div class="chart-bar${stateClass}" style="--bar-height:${height.toFixed(1)}%; animation: growUp 0.6s ease-out ${index * 0.04}s both;" title="${escapeHtml(title)}">
          <span class="bar-value" data-compact="${formatCompactPrice(record._value)}">${formatPrice(record._value)}</span>
          <span class="bar-label">${escapeHtml(shortLabel(record, index))}</span>
        </div>
      `;
    }).join('');

    const averageLine = element('priceTrendAverageLine');
    if (averageLine) {
      averageLine.style.setProperty('--avg-position', `${avgPosition.toFixed(1)}%`);
      const label = averageLine.querySelector('span');
      if (label) {
        label.textContent = `Avg ${formatPrice(avg)}`;
        label.dataset.compact = `Avg ${formatCompactPrice(avg)}`;
      }
    }

    const currentEl = element('priceTrendCurrent');
    const averageEl = element('priceTrendAverage');
    const changeEl = element('priceTrendChange');
    const insightEl = element('priceTrendInsight');
    if (currentEl) currentEl.textContent = formatPrice(last);
    if (averageEl) averageEl.textContent = formatPrice(avg);
    if (changeEl) {
      const trendClass = change > 0.3 ? 'trend-up' : change < -0.3 ? 'trend-down' : 'trend-flat';
      changeEl.className = trendClass;
      changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
    }
    if (insightEl) {
      const direction = change > 0.3 ? 'up' : change < -0.3 ? 'down' : 'stable';
      const bestRecord = records.find(record => record._value === max);
      insightEl.textContent = `${commodity} live mandi trend is ${direction} ${Math.abs(change).toFixed(1)}% across ${records.length} official records. Chart shows ${chartRecords.length} representative mandis. Highest modal price: ${formatPrice(max)}/q at ${bestRecord?.market || 'available market'}.`;
    }

    chartGroup.closest('.chart-container')?.querySelectorAll('.chart-filter').forEach(button => {
      button.classList.toggle('active', button.textContent.trim() === activePeriod);
    });

    updateNote(`Live Data.gov.in records for ${commodity} in ${DEFAULT_STATE}`);
    return true;
  }

  async function loadDashboardMarketTrend(commodity = activeCommodity) {
    const chartGroup = element('priceTrendBars');
    if (!chartGroup || typeof apiFetch !== 'function') return;

    activeCommodity = selectedCommodityFromValue(commodity);
    isLoading = true;
    renderLiveDashboardTrend(activePeriod, activeCommodity);
    updateNote(`Loading live Data.gov.in records for ${activeCommodity}...`);

    try {
      const params = new URLSearchParams({
        state: DEFAULT_STATE,
        commodity: activeCommodity,
        limit: DEFAULT_LIMIT,
      });
      const data = await apiFetch(`/market-prices?${params.toString()}`);
      liveRecords = Array.isArray(data.records) ? data.records : [];
      if (liveRecords[0]?.commodity) activeCommodity = liveRecords[0].commodity;
    } catch (error) {
      liveRecords = [];
      updateNote('Could not load official mandi records');
      clearTrend(error?.msg || 'Could not load live mandi prices.');
    } finally {
      isLoading = false;
      renderLiveDashboardTrend(activePeriod, activeCommodity);
    }
  }

  window.renderLiveMandiTrend = renderLiveDashboardTrend;
  window.loadDashboardMarketTrend = loadDashboardMarketTrend;

  document.addEventListener('DOMContentLoaded', () => {
    const cropSelect = element('priceTrendCrop');
    if (cropSelect) {
      cropSelect.value = 'onion';
      cropSelect.addEventListener('change', () => {
        loadDashboardMarketTrend(selectedCommodityFromValue(cropSelect.value));
      });
    }
    loadDashboardMarketTrend(DEFAULT_COMMODITY);
  });
}());
