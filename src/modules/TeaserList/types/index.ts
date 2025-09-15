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

type TeaserListResponse = {
  data: TeaserItem[];
  meta: TeaserListMeta;
};


export type { TeaserItem, TeaserListMeta, TeaserListResponse };
