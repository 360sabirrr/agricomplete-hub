(function () {
  const DEFAULT_QUERY = {
    state: 'Maharashtra',
    commodity: 'Onion',
    limit: '50',
  };

  let mandiPriceChart = null;
  let currentMandiRecords = [];
  let activeTrendPeriod = '1W';
  let activeTrendCommodity = DEFAULT_QUERY.commodity;
  let mandiAutoRefreshTimer = null;

  function element(id) {
    return document.getElementById(id);
  }

  function t(key, fallback) {
    if (typeof window.translateLabel === 'function') {
      return window.translateLabel(key) || fallback;
    }
    return fallback;
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

  function price(value) {
    if (value === null || value === undefined || value === '') return 'Not available';
    const amount = Number(value);
    if (!Number.isFinite(amount)) return 'Not available';
    return `\u20b9${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })} / quintal`;
  }

  function compactPrice(value) {
    if (value === null || value === undefined || value === '') return '--';
    const amount = Number(value);
    if (!Number.isFinite(amount)) return '--';
    return `\u20b9${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  }

  function formatTrendPrice(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return 'Rs.--';
    return `Rs.${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  }

  function formatTrendCompactPrice(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return '--';
    if (Math.abs(amount) >= 1000) {
      const thousands = amount / 1000;
      return `${thousands.toFixed(thousands >= 10 ? 0 : 1).replace(/\.0$/, '')}k`;
    }
    return Math.round(amount).toString();
  }

  function setStatus(text, type = 'info') {
    const status = element('mandiDataStatus');
    if (!status) return;
    status.textContent = text;
    status.className = `badge badge-${type}`;
  }

  function showMessage(message, type = 'info') {
    const box = element('mandiMessage');
    if (!box) return;
    box.hidden = !message;
    box.className = `mandi-message ${type}`;
    box.textContent = message || '';
  }

  function recordLabel(record, index) {
    return record.market || record.arrival_date || `Record ${index + 1}`;
  }

  function shortTrendLabel(record, index) {
    const label = String(record.market || record.arrival_date || `Mandi ${index + 1}`)
      .replace(/\s+APMC\b/gi, '')
      .replace(/\([^)]*\)/g, '')
      .trim();
    return label.length > 10 ? `${label.slice(0, 9)}...` : label;
  }

  function sampleTrendRecords(records) {
    const maxBars = window.matchMedia('(max-width: 768px)').matches ? 6 : 10;
    if (records.length <= maxBars) return records;
    return Array.from({ length: maxBars }, (_, index) => {
      const sourceIndex = Math.round(index * (records.length - 1) / (maxBars - 1));
      return records[sourceIndex];
    });
  }

  function parseMandiDate(value) {
    if (!value) return null;
    const text = String(value).trim();
    const slashMatch = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (slashMatch) {
      const [, day, month, year] = slashMatch;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    const dashDate = new Date(text);
    return Number.isNaN(dashDate.getTime()) ? null : dashDate;
  }

  function daysForPeriod(period) {
    return { '1W': 7, '1M': 31, '3M': 93, '1Y': 366 }[period] || 7;
  }

  function recordsMatchCommodity(records, commodity) {
    const expected = String(commodity || '').trim().toLowerCase();
    if (!expected) return records;
    return records.filter(record => String(record.commodity || '').trim().toLowerCase() === expected);
  }

  function numericValues(records, key) {
    return records
      .map(record => Number(record[key]))
      .filter(value => Number.isFinite(value));
  }

  function average(values) {
    if (!values.length) return null;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function setSummaryMetric(valueId, noteId, value, note, tone = '') {
    const valueElement = element(valueId);
    const noteElement = element(noteId);
    if (valueElement) {
      valueElement.textContent = value;
      valueElement.classList.remove('dashboard-stat-loading');
      valueElement.title = value;
    }
    if (noteElement) {
      noteElement.textContent = note;
      noteElement.className = `stat-change${tone ? ` ${tone}` : ''}`;
    }
  }

  function resetLiveSummary(message = 'No live records available') {
    setSummaryMetric('marketMostGained', 'marketMostGainedNote', '--', message);
    setSummaryMetric('marketMostDeclined', 'marketMostDeclinedNote', '--', message);
    setSummaryMetric('marketTotalMandis', 'marketTotalMandisNote', '0', 'No mandis in current search');
  }

  function marketIdentity(record) {
    return record?.market || record?.district || 'Unknown mandi';
  }

  function updateLiveSummary(records, refreshedAt = new Date()) {
    const priced = records.filter(record => Number.isFinite(Number(record.modal_price)));
    if (!priced.length) {
      resetLiveSummary();
    } else {
      const modalAverage = average(priced.map(record => Number(record.modal_price)));
      const highest = priced.reduce((best, record) => Number(record.modal_price) > Number(best.modal_price) ? record : best, priced[0]);
      const lowest = priced.reduce((best, record) => Number(record.modal_price) < Number(best.modal_price) ? record : best, priced[0]);
      const highestChange = modalAverage ? ((Number(highest.modal_price) - modalAverage) / modalAverage) * 100 : 0;
      const lowestChange = modalAverage ? ((Number(lowest.modal_price) - modalAverage) / modalAverage) * 100 : 0;
      const commodity = highest.commodity || element('mandiCommodityInput')?.value || 'Commodity';

      setSummaryMetric(
        'marketMostGained',
        'marketMostGainedNote',
        marketIdentity(highest),
        `${commodity}: +${Math.max(0, highestChange).toFixed(1)}% vs search average`,
        'up'
      );
      setSummaryMetric(
        'marketMostDeclined',
        'marketMostDeclinedNote',
        marketIdentity(lowest),
        `${commodity}: ${Math.min(0, lowestChange).toFixed(1)}% vs search average`,
        'down'
      );

      const mandiKeys = new Set(records.map(record => [
        record.market,
        record.district,
        record.state,
      ].map(value => String(value || '').trim().toLowerCase()).join('|')).filter(key => key !== '||'));
      setSummaryMetric(
        'marketTotalMandis',
        'marketTotalMandisNote',
        String(mandiKeys.size),
        `${records.length} official record${records.length === 1 ? '' : 's'} in current search`,
        mandiKeys.size ? 'up' : ''
      );
    }

    const updateTime = element('marketUpdateTime');
    const updateNote = element('marketUpdateNote');
    if (updateTime) {
      updateTime.textContent = refreshedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      updateTime.classList.remove('dashboard-stat-loading');
      updateTime.title = refreshedAt.toLocaleString('en-IN');
    }
    if (updateNote) {
      updateNote.textContent = 'Live API success - refreshes every 5 min';
      updateNote.className = 'stat-change up';
    }
  }

  function updateChartSummary(records) {
    const summary = element('mandiChartSummary');
    const insight = element('mandiChartInsight');
    if (!summary) return;

    if (!records.length) {
      summary.innerHTML = `
        <div class="mandi-chart-kpi"><span>${escapeHtml(t('mandi_avg_modal', 'Avg modal'))}</span><strong>--</strong></div>
        <div class="mandi-chart-kpi"><span>${escapeHtml(t('mandi_top_market', 'Top market'))}</span><strong>--</strong></div>
        <div class="mandi-chart-kpi"><span>${escapeHtml(t('mandi_price_spread', 'Price spread'))}</span><strong>--</strong></div>
      `;
      if (insight) insight.textContent = t('mandi_chart_insight_empty', 'Search mandi prices to compare markets.');
      return;
    }

    const modalPrices = numericValues(records, 'modal_price');
    const minPrices = numericValues(records, 'min_price');
    const maxPrices = numericValues(records, 'max_price');
    const averageModal = average(modalPrices);
    const highestRecord = records.reduce((best, record) => {
      const currentMax = Number(record.max_price);
      const bestMax = Number(best?.max_price);
      return Number.isFinite(currentMax) && (!Number.isFinite(bestMax) || currentMax > bestMax) ? record : best;
    }, null);
    const spread = maxPrices.length && minPrices.length ? Math.max(...maxPrices) - Math.min(...minPrices) : null;

    summary.innerHTML = `
      <div class="mandi-chart-kpi"><span>${escapeHtml(t('mandi_avg_modal', 'Avg modal'))}</span><strong>${escapeHtml(compactPrice(averageModal))}</strong></div>
      <div class="mandi-chart-kpi"><span>${escapeHtml(t('mandi_top_market', 'Top market'))}</span><strong>${escapeHtml(highestRecord?.market || '--')}</strong></div>
      <div class="mandi-chart-kpi"><span>${escapeHtml(t('mandi_price_spread', 'Price spread'))}</span><strong>${escapeHtml(compactPrice(spread))}</strong></div>
    `;

    if (insight) {
      const commodity = records[0]?.commodity || 'commodity';
      const state = records[0]?.state || 'selected state';
      insight.textContent = `${records.length} ${t('mandi_selected_records', 'official records loaded for')} ${state}. ${commodity}: ${t('mandi_modal_line_note', 'Modal line highlights the most realistic trading price.')}`;
    }
  }

  function renderCards(records) {
    const container = element('mandiPriceCards');
    if (!container) return;
    if (!records.length) {
      container.innerHTML = `<div class="mandi-empty"><i class="fas fa-circle-info"></i><strong>${escapeHtml(t('mandi_no_records', 'No records found'))}</strong><span>${escapeHtml(t('mandi_try_broader', 'Try a broader district or market filter.'))}</span></div>`;
      return;
    }

    container.innerHTML = records.slice(0, 6).map(record => `
      <article class="mandi-price-card">
        <div class="mandi-card-top">
          <span>${escapeHtml(record.commodity || 'Commodity')}</span>
          <strong>${escapeHtml(record.arrival_date || 'Latest')}</strong>
        </div>
        <h3>${escapeHtml(record.market || 'Unknown market')}</h3>
        <p>${escapeHtml([record.district, record.state].filter(Boolean).join(', ') || t('mandi_location_unavailable', 'Location not available'))}</p>
        <dl>
          <div><dt>${escapeHtml(t('mandi_variety', 'Variety'))}</dt><dd>${escapeHtml(record.variety || t('mandi_not_specified', 'Not specified'))}</dd></div>
          <div><dt>${escapeHtml(t('mandi_min_price', 'Min Price'))}</dt><dd>${escapeHtml(compactPrice(record.min_price))}</dd></div>
          <div><dt>${escapeHtml(t('mandi_modal_price', 'Modal Price'))}</dt><dd>${escapeHtml(compactPrice(record.modal_price))}</dd></div>
          <div><dt>${escapeHtml(t('mandi_max_price', 'Max Price'))}</dt><dd>${escapeHtml(compactPrice(record.max_price))}</dd></div>
        </dl>
      </article>
    `).join('');
  }

  function renderTable(records) {
    const body = element('mandiLiveTableBody');
    if (!body) return;
    if (!records.length) {
      body.innerHTML = `<tr><td colspan="9">${escapeHtml(t('mandi_no_records_long', 'No records found. Try changing commodity, district, or market.'))}</td></tr>`;
      return;
    }
    body.innerHTML = records.map(record => `
      <tr>
        <td>${escapeHtml(record.arrival_date || '--')}</td>
        <td>${escapeHtml(record.state || '--')}</td>
        <td>${escapeHtml(record.district || '--')}</td>
        <td>${escapeHtml(record.market || '--')}</td>
        <td>${escapeHtml(record.commodity || '--')}</td>
        <td>${escapeHtml(record.variety || '--')}</td>
        <td>${escapeHtml(price(record.min_price))}</td>
        <td><strong>${escapeHtml(price(record.modal_price))}</strong></td>
        <td>${escapeHtml(price(record.max_price))}</td>
      </tr>
    `).join('');
  }

  function renderChart(records) {
    const canvas = element('mandiPriceChart');
    if (!canvas || typeof Chart === 'undefined') return;
    updateChartSummary(records);
    const chartRecords = records.slice(0, 14);
    const labels = chartRecords.map(recordLabel);
    const data = key => chartRecords.map(record => Number(record[key]) || null);

    if (mandiPriceChart) {
      mandiPriceChart.destroy();
    }

    if (!chartRecords.length) {
      return;
    }

    mandiPriceChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Min Price',
            data: data('min_price'),
            borderColor: '#1976D2',
            backgroundColor: 'rgba(25, 118, 210, .16)',
            borderWidth: 1,
            borderRadius: 10,
            borderSkipped: false,
            order: 3,
          },
          {
            label: 'Max Price',
            data: data('max_price'),
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, .22)',
            borderWidth: 1,
            borderRadius: 10,
            borderSkipped: false,
            order: 2,
          },
          {
            type: 'line',
            label: 'Modal Price',
            data: data('modal_price'),
            borderColor: '#087F5B',
            backgroundColor: '#087F5B',
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: '#087F5B',
            pointBorderWidth: 2,
            tension: .38,
            fill: false,
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 650, easing: 'easeOutQuart' },
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              boxWidth: 9,
              boxHeight: 9,
              color: '#17351D',
              font: { weight: '700' },
              padding: 18,
            },
          },
          tooltip: {
            backgroundColor: '#0D2B14',
            titleColor: '#FFFFFF',
            bodyColor: '#EEF8EF',
            borderColor: 'rgba(255,255,255,.18)',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              title: items => {
                const record = chartRecords[items[0]?.dataIndex] || {};
                return [record.market, record.district, record.arrival_date].filter(Boolean).join(' | ') || 'Mandi record';
              },
              afterTitle: items => {
                const record = chartRecords[items[0]?.dataIndex] || {};
                return record.variety ? `Variety: ${record.variety}` : '';
              },
              label: context => `${context.dataset.label}: ${compactPrice(context.raw)} / quintal`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#52715A',
              maxRotation: 35,
              minRotation: 0,
              font: { size: 11, weight: '600' },
            },
          },
          y: {
            beginAtZero: false,
            border: { display: false },
            grid: { color: 'rgba(28, 92, 45, .08)' },
            title: {
              display: true,
              text: 'Price per quintal',
              color: '#52715A',
              font: { size: 12, weight: '700' },
            },
            ticks: {
              color: '#52715A',
              callback: value => `\u20b9${Number(value).toLocaleString('en-IN')}`,
            },
          },
        },
      },
    });
  }

  function recordsForTrend(period, commodity) {
    const limitByPeriod = { '1W': 7, '1M': 12, '3M': 18, '1Y': 28 };
    const usable = recordsMatchCommodity(currentMandiRecords, commodity)
      .map((record, index) => ({
        ...record,
        _index: index,
        _value: Number(record.modal_price),
        _date: parseMandiDate(record.arrival_date),
      }))
      .filter(record => Number.isFinite(record._value));

    const dated = usable.filter(record => record._date);
    if (dated.length > 1) {
      const latestTime = Math.max(...dated.map(record => record._date.getTime()));
      const cutoff = latestTime - daysForPeriod(period) * 24 * 60 * 60 * 1000;
      const filtered = dated
        .filter(record => record._date.getTime() >= cutoff)
        .sort((a, b) => a._date - b._date || a._index - b._index);
      if (filtered.length) return filtered.slice(-limitByPeriod[period] || -7);
    }

    return usable.slice(0, limitByPeriod[period] || 7);
  }

  function clearLiveMandiTrend(message = 'Search official mandi prices to update this trend chart.') {
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
    const noteEl = element('priceTrendSourceNote');
    if (currentEl) currentEl.textContent = 'Rs.--';
    if (averageEl) averageEl.textContent = 'Rs.--';
    if (changeEl) {
      changeEl.className = 'trend-flat';
      changeEl.textContent = '--';
    }
    if (insightEl) insightEl.textContent = message;
    if (noteEl) noteEl.textContent = 'Waiting for official mandi search results';
  }

  function renderLiveMandiTrend(period, crop) {
    const chartGroup = element('priceTrendBars');
    if (!chartGroup) return false;
    if (!currentMandiRecords.length) {
      clearLiveMandiTrend();
      return true;
    }

    activeTrendPeriod = period || activeTrendPeriod || '1W';
    const cropSelect = element('priceTrendCrop');
    const selectedOption = cropSelect?.selectedOptions?.[0]?.textContent?.trim();
    const selectedCommodity = crop || activeTrendCommodity || selectedOption || element('mandiCommodityInput')?.value || DEFAULT_QUERY.commodity;
    const records = recordsForTrend(activeTrendPeriod, selectedCommodity);
    if (!records.length) {
      clearLiveMandiTrend(`No live ${selectedCommodity} records found for the selected filters.`);
      return true;
    }

    activeTrendCommodity = selectedCommodity;
    if (cropSelect) {
      const match = Array.from(cropSelect.options).find(option => option.textContent.trim().toLowerCase() === String(selectedCommodity).toLowerCase());
      if (match) cropSelect.value = match.value;
    }

    const values = records.map(record => record._value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
    const first = values[0];
    const last = values[values.length - 1];
    const range = max - min || 1;
    const avgPosition = 28 + ((avg - min) / range) * 64;
    const change = first ? ((last - first) / first) * 100 : 0;
    const commodity = records[0]?.commodity || selectedCommodity || 'Selected crop';

    const chartRecords = sampleTrendRecords(records);
    chartGroup.dataset.visibleBars = String(chartRecords.length);
    chartGroup.innerHTML = chartRecords.map((record, idx) => {
      const height = 32 + ((record._value - min) / range) * 66;
      const stateClass = record._value === max ? ' is-high' : record._value === min ? ' is-low' : '';
      const label = shortTrendLabel(record, idx);
      const title = `${commodity} | ${record.market || 'Market'} | ${record.arrival_date || 'Latest'}: ${formatTrendPrice(record._value)}`;
      return `
        <div class="chart-bar${stateClass}" style="--bar-height:${height.toFixed(1)}%; animation: growUp 0.6s ease-out ${idx * 0.04}s both;" title="${escapeHtml(title)}">
          <span class="bar-value" data-compact="${formatTrendCompactPrice(record._value)}">${formatTrendPrice(record._value)}</span>
          <span class="bar-label">${escapeHtml(label)}</span>
        </div>
      `;
    }).join('');

    const averageLine = element('priceTrendAverageLine');
    if (averageLine) {
      averageLine.style.setProperty('--avg-position', `${avgPosition.toFixed(1)}%`);
      const label = averageLine.querySelector('span');
      if (label) {
        label.textContent = `Avg ${formatTrendPrice(avg)}`;
        label.dataset.compact = `Avg ${formatTrendCompactPrice(avg)}`;
      }
    }

    const currentEl = element('priceTrendCurrent');
    const averageEl = element('priceTrendAverage');
    const changeEl = element('priceTrendChange');
    const insightEl = element('priceTrendInsight');
    const noteEl = element('priceTrendSourceNote');
    if (currentEl) currentEl.textContent = formatTrendPrice(last);
    if (averageEl) averageEl.textContent = formatTrendPrice(avg);
    if (changeEl) {
      const trendClass = change > 0.3 ? 'trend-up' : change < -0.3 ? 'trend-down' : 'trend-flat';
      changeEl.className = trendClass;
      changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
    }
    if (insightEl) {
      const direction = change > 0.3 ? 'up' : change < -0.3 ? 'down' : 'stable';
      const bestRecord = records.find(record => record._value === max);
      insightEl.textContent = `${commodity} live trend is ${direction} ${Math.abs(change).toFixed(1)}% across ${records.length} mandi records. Chart shows ${chartRecords.length} representative mandis. Highest modal price: ${formatTrendPrice(max)}/q at ${bestRecord?.market || 'available market'}.`;
    }
    if (noteEl) {
      const location = [element('mandiDistrictInput')?.value, element('mandiStateInput')?.value].filter(Boolean).join(', ');
      noteEl.textContent = `Live Data.gov.in records for ${commodity}${location ? ` in ${location}` : ''}`;
    }

    chartGroup.closest('.chart-container')?.querySelectorAll('.chart-filter').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.trim() === activeTrendPeriod);
    });

    return true;
  }

  function buildQuery() {
    const params = new URLSearchParams();
    const values = {
      state: element('mandiStateInput')?.value || DEFAULT_QUERY.state,
      commodity: element('mandiCommodityInput')?.value || DEFAULT_QUERY.commodity,
      district: element('mandiDistrictInput')?.value || '',
      market: element('mandiMarketInput')?.value || '',
      limit: element('mandiLimitInput')?.value || DEFAULT_QUERY.limit,
    };
    Object.entries(values).forEach(([key, value]) => {
      const clean = String(value || '').trim();
      if (clean) params.set(key, clean);
    });
    return params;
  }

  async function loadMandiPrices(event) {
    event?.preventDefault();
    const form = element('mandiSearchForm');
    const button = form?.querySelector('button[type="submit"]');
    const original = button?.innerHTML;
    setStatus('Loading', 'info');
    showMessage(t('mandi_loading_prices', 'Loading official mandi prices...'), 'info');
    if (button) {
      button.disabled = true;
      button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${escapeHtml(t('mandi_loading', 'Loading...'))}`;
    }

    try {
      const data = await apiFetch(`/market-prices?${buildQuery().toString()}`);
      const records = Array.isArray(data.records) ? data.records : [];
      currentMandiRecords = records;
      activeTrendCommodity = records[0]?.commodity || element('mandiCommodityInput')?.value || DEFAULT_QUERY.commodity;
      renderCards(records);
      renderTable(records);
      renderChart(records);
      if (!records.length) {
        updateLiveSummary([], new Date());
        setStatus('No data', 'warning');
        showMessage(data.message || t('mandi_no_records_long', 'No records found. Try changing commodity, district, or market.'), 'warning');
      } else {
        updateLiveSummary(records, new Date());
        setStatus(`${records.length} records`, 'info');
        showMessage('', 'info');
      }
    } catch (error) {
      renderCards([]);
      renderTable([]);
      renderChart([]);
      currentMandiRecords = [];
      resetLiveSummary('Live API request failed');
      const updateNote = element('marketUpdateNote');
      if (updateNote) {
        updateNote.textContent = 'Refresh paused until API responds';
        updateNote.className = 'stat-change down';
      }
      setStatus('Error', 'danger');
      showMessage(error?.msg || t('mandi_load_error', 'Could not load official mandi prices.'), 'error');
    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = original;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = element('mandiSearchForm');
    if (!form) return;
    form.addEventListener('submit', loadMandiPrices);
    const cropSelect = element('priceTrendCrop');
    cropSelect?.addEventListener('change', () => {
      const selectedCommodity = cropSelect.selectedOptions?.[0]?.textContent?.trim();
      if (selectedCommodity && element('mandiCommodityInput')) {
        element('mandiCommodityInput').value = selectedCommodity;
        activeTrendCommodity = selectedCommodity;
        loadMandiPrices();
      }
    });
    window.renderLiveMandiTrend = renderLiveMandiTrend;
    window.addEventListener('agri:languagechange', () => {
      renderCards(currentMandiRecords);
      renderTable(currentMandiRecords);
      renderChart(currentMandiRecords);
    });
    loadMandiPrices();
    mandiAutoRefreshTimer = window.setInterval(() => {
      if (document.visibilityState === 'visible') loadMandiPrices();
    }, 5 * 60 * 1000);
    window.addEventListener('beforeunload', () => {
      if (mandiAutoRefreshTimer) window.clearInterval(mandiAutoRefreshTimer);
    });
  });
}());
