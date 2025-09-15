import type { formatISODateProps } from '@/utilities/formatDate/types';

const formatISODate = ({ ISODate, options }: formatISODateProps): string => {
  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(new Date(ISODate));
};

export { formatISODate };
