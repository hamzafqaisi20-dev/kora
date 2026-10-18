import { ref, computed } from 'vue';
import ar from '../locales/ar';
import en from '../locales/en';

const currentLocale = ref(localStorage.getItem('korapass_locale') || 'ar');

export function useLocalization() {
  const isRtl = computed(() => currentLocale.value === 'ar');

  const t = computed(() => {
    return currentLocale.value === 'ar' ? ar : en;
  });

  const setLocale = (locale) => {
    currentLocale.value = locale;
    localStorage.setItem('korapass_locale', locale);
    updateHtmlAttributes();
  };

  const toggleLocale = () => {
    setLocale(currentLocale.value === 'ar' ? 'en' : 'ar');
  };

  const updateHtmlAttributes = () => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      html.setAttribute('dir', isRtl.value ? 'rtl' : 'ltr');
      html.setAttribute('lang', currentLocale.value);
    }
  };

  // Initialize on load
  updateHtmlAttributes();

  return {
    currentLocale,
    isRtl,
    t,
    setLocale,
    toggleLocale,
  };
}
