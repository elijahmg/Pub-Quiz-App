export function isCSR() {
  return Boolean(typeof window !== 'undefined' && window.document);
}
