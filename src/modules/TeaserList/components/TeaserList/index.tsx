import { useIntersectionObserver } from '@/hooks/useObserver';
import useTeaserList from '../../hooks/useTeaserList';
import { TeaserCard } from '../TeaserCard';
import styles from './TeaserList.module.scss';

export default function TeaserList() {
  const { teasers, isLoading, error, hasMorePages, nextPage } = useTeaserList();
  const { observerRef } = useIntersectionObserver({
    onIntersection: nextPage,
  });

  if (isLoading && !teasers?.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message}</div>;
  if (!teasers?.length) return <div>No data</div>;

  return (
    <section className={styles.list}>
      <h2 className={styles.title}>Teaser List</h2>
      {teasers.map((item) => (
        <TeaserCard key={item.id} {...item} />
      ))}
      {hasMorePages && !isLoading && (
        <div ref={observerRef} style={{ height: 1 }} />
      )}
      {isLoading && <div>Loading...</div>}
    </section>
  );
}
