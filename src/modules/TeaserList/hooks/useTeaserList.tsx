import { useCallback, useEffect, useState } from 'react';
import type { TeaserItem, TeaserListResponse } from '../types';

export default function useTeaserList() {
  const [teasers, setTeasers] = useState<TeaserItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api-test.rtbpanda.tech/list?page=${page}&pageSize=10`,
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data: TeaserListResponse = await response.json();
        const hasMorePages =
          data.meta.currentPage * data.meta.itemsPerPage < data.meta.count;
        setTeasers((prev) => [...prev, ...data.data]);
        setHasMorePages(hasMorePages);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setError(error as Error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoading) fetchData();

    return () => {
      abortController.abort();
    };
  }, [page]);

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return {
    teasers,
    isLoading,
    error,
    hasMorePages,
    nextPage,
  };
}
