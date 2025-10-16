import { useRef } from 'react';

export const useThrottle = (callback: () => void, delay = 500) => {
  const lastTime = useRef(Date.now());
  // const refCallback = useRef(callback);

  return () => {
    const now = Date.now();
    if (now - lastTime.current >= delay) {
      callback();
      lastTime.current = now;
    }
  };
};
