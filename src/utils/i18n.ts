import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      title: "Unlock Your Skin's Potential with",
      subTitle: "Discover the secret to radiant and youthful skin with GLOW. Experience the power of nature's ingredients combined with cutting-edge science.",
      exploreProducts: "Explore Products"

    }
  },
  ar: {
    translation: {
      title: 'اكتشف إمكانيات بشرتك مع',
      subTitle: "اكتشف سر البشرة المتألقة والشبابية مع GLOW. استمتع بتجربة قوة مكونات الطبيعة جنبًا إلى جنب مع أحدث التقنيات",
      exploreProducts: "استكشف المنتجات"

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
