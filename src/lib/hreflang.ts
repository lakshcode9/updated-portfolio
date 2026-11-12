/** hreflang alternates for a page that exists in English and Japanese. x-default is the English page. */
export function languages(enPath: string, jaPath: string) {
  return { en: enPath, ja: jaPath, "x-default": enPath };
}
