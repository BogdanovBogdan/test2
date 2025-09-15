import { useCallback } from 'react';

type UseIntersectionObserver = {
  onIntersection: () => void;
};

const useIntersectionObserver = ({
  onIntersection,
}: UseIntersectionObserver) => {
  const observerRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onIntersection();
          }
        },
        { root: null, rootMargin: '200px', threshold: 0 }
      );

      if (element) observer.observe(element);

      return () => {
        if (element) observer.unobserve(element);
      };
    },
    [onIntersection]
  );

  return { observerRef };
};

export { useIntersectionObserver };
