import { useTeaserListStore } from '@modules/TeaserList/store';
import type { TeaserItem } from '@modules/TeaserList/types';
import { useEffect, useState } from 'react';

type TeaserListMeta = {
  count: number;
  currentPage: number;
  itemsPerPage: number;
};

type TeaserListResponse = {
  data: TeaserItem[];
  meta: TeaserListMeta;
};

type UseTeaserListProps = {
  itemsPerPage?: number;
};

export default function useTeaserList({
  itemsPerPage = 10,
}: UseTeaserListProps = {}) {
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
          `https://api-test.rtbpanda.tech/list?page=${page}&pageSize=${itemsPerPage}`,
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const { data, meta }: TeaserListResponse = await response.json();
        const hasMorePages = meta.currentPage * meta.itemsPerPage < meta.count;
        setTeasers([...teasers, ...data]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    return () => {
      resetTeasers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    teasers,
    isLoading,
    error,
    hasMorePages,
    nextPage,
  };
}
