/**
 * Promise Cache — required for React 19 use() hook.
 * use() expects the same Promise reference on re-renders.
 * This caches promises by key so they're stable across renders.
 */

const cache = new Map();

export function cachePromise(key, fn) {
  if (!cache.has(key)) {
    cache.set(key, fn());
  }
  return cache.get(key);
}

export function invalidateCache(key) {
  cache.delete(key);
}

export function invalidateAll() {
  cache.clear();
}
