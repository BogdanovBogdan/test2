type TeaserItem = {
  id: string;
  date: string;
  title: string;
  message: string;
  imgUrl: string | null;
};

type TeaserListMeta = {
  count: number;
  currentPage: number;
  itemsPerPage: number;
};

export type { TeaserItem, TeaserListMeta };
