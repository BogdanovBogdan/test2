import clsx from 'clsx';
import styles from './Spinner.module.scss';
import type { SpinnerProps } from './types';

const Spinner = ({ size = 'medium', className, fullScreen }: SpinnerProps) => {
  const containerClassName = clsx(
    styles.spinnerContainer,
    { [styles['spinnerContainer-fullScreen']]: fullScreen },
    className
  );

  const spinnerClassName = clsx(
    styles.spinner,
    styles[`spinner-${size}`],
    className
  );

  return (
    <div className={containerClassName}>
      <div className={spinnerClassName} />
    </div>
  );
};

export { Spinner };
