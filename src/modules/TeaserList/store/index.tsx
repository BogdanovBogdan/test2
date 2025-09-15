import type { TeaserItem } from '@modules/TeaserList/types';
import { create } from 'zustand';

type TeaserListStore = {
  teasers: TeaserItem[];
  page: number;
  hasMorePages: boolean;
  setTeasers: (teasers: TeaserItem[]) => void;
  resetTeasers: () => void;
  nextPage: () => void;
  setHasMorePages: (hasMorePages: boolean) => void;
};

const initialState: Pick<TeaserListStore, 'teasers' | 'page' | 'hasMorePages'> =
  {
    teasers: [],
    page: 1,
    hasMorePages: false,
  };

const useTeaserListStore = create<TeaserListStore>((set) => ({
  ...initialState,
  setTeasers: (teasers) => set({ teasers }),
  resetTeasers: () => set(initialState),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  setHasMorePages: (hasMorePages) => set({ hasMorePages }),
}));

export { useTeaserListStore };
