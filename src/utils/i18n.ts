import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      title: "Unlock Your Skin's Potential with GLOW"
    }
  },
  ar: {
    translation: {
      title: 'تيست'
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
