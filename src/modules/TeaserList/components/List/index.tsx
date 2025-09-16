import { Spinner } from '@/ui';
import { Virtuoso } from 'react-virtuoso';
import useTeaserList from '../../hooks/useTeaserList';
import { TeaserCard } from '../Card';
import styles from './TeaserList.module.scss';

const TeaserList = () => {
  const { teasers, isLoading, error, hasMorePages, nextPage } = useTeaserList();

  if (isLoading && !teasers.length) return <Spinner fullScreen />;
  if (error) return <div>Error: {error.message || 'Unknown error'}</div>;
  if (!teasers.length) return <div>No data</div>;

  return (
    <section className={styles.list}>
      <h1 className={styles.title}>Teaser List</h1>
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
            if (isLoading) return <Spinner size='small' />;
          },
        }}
      />
    </section>
  );
};

export { TeaserList };
