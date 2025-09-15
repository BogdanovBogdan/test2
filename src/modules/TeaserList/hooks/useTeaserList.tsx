import { useTeaserListStore } from '@modules/TeaserList/store';
import type { TeaserItem, TeaserListMeta } from '@modules/TeaserList/types';
import { useEffect, useState } from 'react';

type TeaserListResponse = {
  data: TeaserItem[];
  meta: TeaserListMeta;
};

export default function useTeaserList() {
  const {
    teasers,
    page,
    hasMorePages,
    setTeasers,
    resetTeasers,
    nextPage,
    setHasMorePages,
  } = useTeaserListStore();
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
        setTeasers([...teasers, ...data.data]);
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

  useEffect(() => {
    resetTeasers();
  }, []);

  return {
    teasers,
    isLoading,
    error,
    hasMorePages,
    nextPage,
  };
}
