export function isCSR() {
  return Boolean(typeof window !== 'undefined' && window.document);
}

// @TODO maybe replace with uuid?
export function generateRandomId() {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
}

// Get multiple functions and return a single one. When that one is called, it calls all the other functions,
// passing them all the arguments
export function getCombinedFunction<T extends unknown[]>(
  ...functions: ((...args: T) => void)[]
) {
  return (...args: T) => {
    functions.forEach((fn) => {
      fn(...args);
    });
  };
}
