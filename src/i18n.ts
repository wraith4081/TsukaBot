import i18next from 'i18next';

import translation, { languages, namespaces } from './locales';

i18next.init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    // debug: true,

    fallbackLng: 'en',
    supportedLngs: languages,

    ns: namespaces,

    resources: Object.entries(translation).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value
    }), {})
});