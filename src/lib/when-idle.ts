/** requestIdleCallback with a timeout; Safari has no rIC, so fall back to a short timer. */
export function whenIdle(callback: () => void, timeout: number): () => void {
  if ("requestIdleCallback" in window) {
    const id = requestIdleCallback(callback, { timeout });
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 60);
  return () => clearTimeout(id);
}
