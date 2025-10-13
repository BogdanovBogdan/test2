import { useCallback, useEffect, useRef } from 'react';

type UseIntersectionObserver = {
  onIntersection: () => void;
};

const useIntersectionObserver = ({
  onIntersection,
}: UseIntersectionObserver) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const nodeRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return;

      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) onIntersection();
          }
        });
      }

      if (element) observerRef.current.observe(element);

      return () => {
        if (observerRef.current && element) {
          observerRef.current.unobserve(element);
        }
      };
    },
    [onIntersection]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return { nodeRef };
};

export { useIntersectionObserver };
