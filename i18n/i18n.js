import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// translation files
import en from './en'
import * as enCycleDay from './en/cycle-day'
import enExport from './en/export'
import enSettings from './en/settings'
import enLinks from './en/links'
import * as enLabels from './en/labels'

const resources = {
  en: {
    translation: {
      ...en,
      cycles: {
        ...enCycleDay,
      },
      export: {
        ...enExport,
      },
      label: {
        ...enLabels,
      },
      settings: {
        ...enSettings,
      },
      links: {
        ...enLinks,
      },
    },
  },
}

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3', // TODO: migrate json to v4 and afterwards remove it
    resources,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
