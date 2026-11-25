/**
 * Pomoćna funkcija za ispravno generiranje putanja do statičkih datoteka u `public/`
 * kako bi stranica radila jednako na lokalnom serveru (`/`), prilagođenoj domeni
 * i na GitHub Pages podputanji (`/nogometne-lige-i-turniri/`).
 */
export function assetUrl(relativePath: string): string {
  const cleanPath = relativePath.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
}
