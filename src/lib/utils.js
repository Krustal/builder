// Some helper functions used in the app

// TODO: Remove once other functions are defined
// eslint-disable-next-line import/prefer-default-export
export function fallbacks(...values) {
  const presentValue = values
    .find(v => (typeof v !== 'undefined' && v !== null));
  return typeof presentValue !== 'undefined' ? presentValue : null;
}
