import clsx from 'clsx';
import { useState, type SyntheticEvent } from 'react';
import styles from './Image.module.scss';
import type { ImageProps } from './types';

const Image = ({ className, onLoad, ...rest }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const classNameImage = clsx(
    styles.image,
    { [styles.imageLoading]: isLoading },
    className
  );

  const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (onLoad) onLoad(event);
    setIsLoading(false);
  };

  return <img className={classNameImage} onLoad={handleLoad} {...rest} />;
};

export { Image };
