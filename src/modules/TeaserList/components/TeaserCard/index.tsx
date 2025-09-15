import { Image } from '@/UI';
import { formatISODate } from '@/utilities';
import styles from '@modules/TeaserList/components/TeaserCard/TeaserCard.module.scss';
import type { TeaserItem } from '@modules/TeaserList/types';
import { memo } from 'react';

const TeaserCard = memo(({ date, title, message, imgUrl }: TeaserItem) => {
  const formattedDate = formatISODate({
    ISODate: date,
    options: {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    },
  });

  return (
    <article className={styles.card}>
      {imgUrl && <Image src={imgUrl} alt={title} className={styles.image} />}
      <div>
        <time dateTime={date} className={styles.date}>
          {formattedDate}
        </time>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
      </div>
    </article>
  );
});

export { TeaserCard };
