import { TeaserCard } from '@modules/TeaserList/components/TeaserCard';
import styles from '@modules/TeaserList/components/TeaserList/TeaserList.module.scss';
import useTeaserList from '@modules/TeaserList/hooks/useTeaserList';
import { Virtuoso } from 'react-virtuoso';

export default function TeaserList() {
  const { teasers, isLoading, error, hasMorePages, nextPage } = useTeaserList();

  if (isLoading && !teasers?.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message}</div>;
  if (!teasers?.length) return <div>No data</div>;

  return (
    <section className={styles.list}>
      <h2 className={styles.title}>Teaser List</h2>
      <Virtuoso
        useWindowScroll
        data={teasers}
        endReached={hasMorePages ? nextPage : undefined}
        itemContent={(_, item) => <TeaserCard key={item.id} {...item} />}
        className={styles.virtuosoContainer}
        components={{
          List: ({ children, ...props }) => (
            <div className={styles.virtuosoList} {...props}>
              {children}
            </div>
          ),
          Footer: () => {
            if (isLoading) return <div>Loading...</div>;
          },
        }}
      />
    </section>
  );
}
