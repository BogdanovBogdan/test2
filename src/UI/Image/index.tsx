import clsx from 'clsx';
import { useState, type SyntheticEvent } from 'react';
import fallbackImg from './broken-image.png';
import styles from './Image.module.scss';
import type { ImageProps } from './types';

const Image = ({ className, onLoad, onError, ...rest }: ImageProps) => {
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

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = fallbackImg;
    if (onError) onError(event);
    setIsLoading(false);
  };

  return (
    <img
      className={classNameImage}
      onLoad={handleLoad}
      onError={handleError}
      {...rest}
    />
  );
};

export { Image };
