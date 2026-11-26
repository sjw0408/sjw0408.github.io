export const origin = 'https://sjw0408.github.io';
export const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

export function shareTags(title, description, path, language, image = '/assets/portal/share.png') {
  return `  <meta property="og:type" content="website">
  <meta property="og:locale" content="${language === 'ko' ? 'ko_KR' : 'en_US'}">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:image" content="${escape(origin + image)}">
  <meta property="og:url" content="${escape(origin + path)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="any">`;
}
