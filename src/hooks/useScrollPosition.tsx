import { useState, useEffect, useCallback } from "react";
import { useThrottle } from "./useThrottledCallback";

export const useScrollPosition = (options?: {
  throttle?: number;
  enabled?: boolean;
}) => {
  const [scrollY, setScrollY] = useState(0);

  const updateScrollY = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  const throttledUpdate = useThrottle(updateScrollY, options?.throttle ?? 50);

  useEffect(() => {
    if (options?.enabled === false) return;

    updateScrollY();
    const handler = options?.throttle ? throttledUpdate : updateScrollY;
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [throttledUpdate, updateScrollY, options?.throttle, options?.enabled]);

  return scrollY;
};
