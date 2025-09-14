import styles from './TeaserList.module.scss';

export default function TeaserList() {
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  // if (!teasers.length) return <div>No data</div>;

  return (
    <section className={styles.list}>
      <h2 className={styles.title}>Teaser List</h2>
      {/* {teasers.map((item) => (
        <TeaserCard key={item.id} {...item} />
      ))} */}
    </section>
  );
}
