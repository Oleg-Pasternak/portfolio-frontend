import { useMemo, useRef } from "react";

export const useThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const lastCall = useRef(0);

  return useMemo(() => {
    return (...args: T) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        callback(...args);
        lastCall.current = now;
      }
    };
  }, [callback, delay]);
};
