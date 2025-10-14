import { Image } from '@/ui';
import { formatISODate } from '@/utilities';
import { memo } from 'react';
import type { TeaserItem } from '../../types';
import styles from './TeaserCard.module.scss';

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
