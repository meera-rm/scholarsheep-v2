import { useEffect, useRef } from 'react';

export function usePolling(callback, intervalMs, enabled = true) {
  const savedCallback = useRef(callback);

  // Always keep the latest callback without restarting the interval
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => savedCallback.current();
    tick(); // run once immediately, don't wait for the first interval

    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id); // cleanup on unmount or when enabled changes
  }, [intervalMs, enabled]);
}
