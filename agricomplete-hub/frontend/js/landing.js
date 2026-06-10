/* Lightweight landing-page startup. The full app bundle is loaded only for translation. */
(function () {
  let appBundlePromise = null;

  function loadAppBundle() {
    if (appBundlePromise) return appBundlePromise;

    appBundlePromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'js/main.js?v=weather-api-20260608';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Could not load language support.'));
      document.head.appendChild(script);
    });
    return appBundlePromise;
  }

  async function enableLanguage(language) {
    const normalized = String(language || 'en').toLowerCase().split('-')[0];
    localStorage.setItem('agri_lang', normalized);

    if (normalized === 'en') {
      window.location.reload();
      return;
    }

    try {
      await loadAppBundle();
      if (typeof window.applyTranslations === 'function') {
        window.applyTranslations();
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  window.changeLanguage = enableLanguage;
  window.toggleMobileMenu = function () {
    document.getElementById('navLinks')?.classList.toggle('open');
  };

  window.addEventListener('scroll', () => {
    document.getElementById('landingNav')?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  document.addEventListener('DOMContentLoaded', () => {
    const links = document.getElementById('navLinks');
    links?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });

    const savedLanguage = localStorage.getItem('agri_lang') || 'en';
    const selector = document.getElementById('langSelectorLanding');
    if (selector) selector.value = savedLanguage;

    if (savedLanguage !== 'en') {
      const schedule = window.requestIdleCallback || (callback => setTimeout(callback, 0));
      schedule(() => enableLanguage(savedLanguage));
    }
  });
}());
