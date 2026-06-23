(function () {
  const MAX_ACTIVITIES = 4;

  function element(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[character]));
  }

  function validDate(value) {
    const date = value ? new Date(value) : null;
    return date && !Number.isNaN(date.getTime()) ? date : null;
  }

  function relativeTime(value) {
    const date = validDate(value);
    if (!date) return 'Recently';
    const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
    if (seconds < 60) return 'Just now';
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.round(hours / 24);
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function listingActivities(payload) {
    const listings = Array.isArray(payload) ? payload : [];
    return listings.map(listing => ({
      type: 'Marketplace',
      icon: 'fa-store',
      tone: 'market',
      title: `Listed ${listing.crop_name || 'crop'} for sale`,
      detail: `${listing.quantity || 'Quantity not set'} at Rs.${Number(listing.price || 0).toLocaleString('en-IN')}/q`,
      createdAt: listing.created_at,
    }));
  }

  function diseaseActivities(payload) {
    const scans = Array.isArray(payload?.scans) ? payload.scans : [];
    return scans.map(scan => ({
      type: 'Disease scan',
      icon: 'fa-leaf',
      tone: 'disease',
      title: scan.name || 'Crop disease scan completed',
      detail: `${Number(scan.confidence || 0).toFixed(1)}% confidence - ${scan.severity || 'severity unavailable'}`,
      createdAt: scan.created_at,
    }));
  }

  function cropShieldActivities(payload) {
    const cases = Array.isArray(payload?.cases) ? payload.cases : [];
    return cases.map(report => ({
      type: 'CropShield',
      icon: 'fa-shield-halved',
      tone: 'shield',
      title: `${report.crop_name || 'Crop'} loss report generated`,
      detail: `${report.reference || 'Report'} - ${report.status || 'Report ready'}`,
      createdAt: report.created_at,
    }));
  }

  function alertActivities(payload) {
    const alerts = Array.isArray(payload?.alerts) ? payload.alerts : [];
    return alerts.map(alert => ({
      type: alert.type || 'Farm alert',
      icon: 'fa-bell',
      tone: 'alert',
      title: alert.title || 'Farm alert received',
      detail: alert.message || '',
      createdAt: alert.created_at,
    }));
  }

  function activityHtml(activity) {
    return `
      <article class="profile-activity-item">
        <div class="profile-activity-icon activity-${escapeHtml(activity.tone)}"><i class="fas ${escapeHtml(activity.icon)}"></i></div>
        <div class="profile-activity-copy">
          <div class="profile-activity-meta">
            <span>${escapeHtml(activity.type)}</span>
            <time datetime="${escapeHtml(activity.createdAt || '')}">${escapeHtml(relativeTime(activity.createdAt))}</time>
          </div>
          <strong>${escapeHtml(activity.title)}</strong>
          ${activity.detail ? `<p>${escapeHtml(activity.detail)}</p>` : ''}
        </div>
      </article>
    `;
  }

  function renderActivities(activities) {
    const list = element('profileActivityList');
    if (!list) return;
    if (!activities.length) {
      list.innerHTML = `
        <div class="profile-activity-state profile-activity-empty">
          <i class="fas fa-clock-rotate-left"></i>
          <strong>No activity yet</strong>
          <span>Your disease scans, listings, alerts, and CropShield reports will appear here.</span>
        </div>
      `;
      return;
    }
    list.innerHTML = activities.map(activityHtml).join('');
  }

  async function loadProfileActivity() {
    const list = element('profileActivityList');
    const refresh = element('profileActivityRefresh');
    if (!list || typeof apiFetch !== 'function') return;

    if (refresh) {
      refresh.disabled = true;
      refresh.querySelector('i')?.classList.add('fa-spin');
    }
    list.innerHTML = '<div class="profile-activity-state"><i class="fas fa-spinner fa-spin"></i><span>Loading your latest activity...</span></div>';

    const requests = await Promise.allSettled([
      apiFetch('/disease/scans?limit=10'),
      apiFetch('/market/my-listings'),
      apiFetch('/cropshield/cases'),
      apiFetch('/user/alerts'),
    ]);
    const activities = [];
    if (requests[0].status === 'fulfilled') activities.push(...diseaseActivities(requests[0].value));
    if (requests[1].status === 'fulfilled') activities.push(...listingActivities(requests[1].value));
    if (requests[2].status === 'fulfilled') activities.push(...cropShieldActivities(requests[2].value));
    if (requests[3].status === 'fulfilled') activities.push(...alertActivities(requests[3].value));

    activities.sort((first, second) => {
      const secondTime = validDate(second.createdAt)?.getTime() || 0;
      const firstTime = validDate(first.createdAt)?.getTime() || 0;
      return secondTime - firstTime;
    });
    renderActivities(activities.slice(0, MAX_ACTIVITIES));

    if (refresh) {
      refresh.disabled = false;
      refresh.querySelector('i')?.classList.remove('fa-spin');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!element('profileActivityList')) return;
    element('profileActivityRefresh')?.addEventListener('click', loadProfileActivity);
    loadProfileActivity();
  });
}());
