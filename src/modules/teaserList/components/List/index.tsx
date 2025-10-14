import { useIntersectionObserver, useWindowSize } from '@/hooks';
import { Spinner } from '@/ui';
import { VirtuosoMasonry } from '@virtuoso.dev/masonry';
import useTeaserList from '../../hooks/useTeaserList';
import { TeaserCard } from '../Card';
import styles from './TeaserList.module.scss';

const TeaserList = () => {
  const { teasers, isLoading, error, hasMorePages, nextPage } = useTeaserList();
  const { nodeRef: sentinelRef } = useIntersectionObserver({
    onIntersection: nextPage,
  });
  const { windowWidth } = useWindowSize();

  if (isLoading && !teasers.length) return <Spinner fullScreen />;
  if (error) return <div>Error: {error.message || 'Unknown error'}</div>;
  if (!teasers.length) return <div>No data</div>;

  return (
    <section className={styles.list}>
      <h1 className={styles.title}>Teaser List</h1>
      <VirtuosoMasonry
        className={styles.virtuosoContainer}
        useWindowScroll
        columnCount={windowWidth > 768 ? 2 : 1}
        data={teasers}
        ItemContent={({ data }) => (
          <div className={styles.virtuosoItem}>
            <TeaserCard key={data.id} {...data} />
          </div>
        )}
      />
      {isLoading && <Spinner size='small' />}
      {hasMorePages && !isLoading && <div ref={sentinelRef} />}
    </section>
  );
};

export { TeaserList };
