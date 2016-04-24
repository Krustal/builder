// Some helper functions used in the app

export function fallbacks(...values) {
  let presentValue = values.find( v => (typeof v !== 'undefined' && v !== null));
  return typeof presentValue !== 'undefined' ? presentValue : null;
}
