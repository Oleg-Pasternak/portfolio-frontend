import { useState, useEffect, useCallback } from "react";
import { useThrottle } from "./useThrottledCallback";

type Position = { x: number; y: number };

export const useMousePosition = (options?: {
  throttle?: number;
  enabled?: boolean;
}) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const throttledUpdate = useThrottle(updatePosition, options?.throttle ?? 100);

  useEffect(() => {
    if (options?.enabled === false) return;

    window.addEventListener("mousemove", throttledUpdate);
    return () => window.removeEventListener("mousemove", throttledUpdate);
  }, [throttledUpdate, options?.enabled]);

  return position;
};
