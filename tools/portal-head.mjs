export const origin = 'https://sjw0408.github.io';
export const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

const locales = {
  ko: 'ko_KR', en: 'en_US', ja: 'ja_JP', es: 'es_ES',
  'pt-BR': 'pt_BR', 'zh-TW': 'zh_TW', de: 'de_DE', fr: 'fr_FR',
};

export function shareTags(title, description, path, language, image = '/assets/portal/share.png') {
  return `  <meta property="og:type" content="website">
  <meta property="og:locale" content="${locales[language]}">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:image" content="${escape(origin + image)}">
  <meta property="og:url" content="${escape(origin + path)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="any">`;
}
