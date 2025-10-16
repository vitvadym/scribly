import { Asset } from '@/db/schema/asset';
import { Category } from '@/db/schema/category';
import { create } from 'zustand';

type PostType = {
  id?: number;
  title: string | null;
  content: string | null;
  category: Category | null;
  asset: Pick<Asset, 'url' | 'publicId' | 'assetId'> | null;
  slug: string | null;
  description: string | null;
};

export const initValues = {
  title: '',
  content: '',
  category: null,
  asset: null,
  slug: '',
  description: '',
};
type PostActions = {
  setPostFormValues: (values: Partial<PostType>) => void;
  reset: () => void;
};

type PostStore = PostType & PostActions;

export const usePostStore = create<PostStore>((set) => ({
  ...initValues,
  setPostFormValues: (values: Partial<PostType>) => set((prev) => ({ ...prev, ...values })),
  reset: () => set(initValues),
}));

export const usePostFormValues = () =>
  usePostStore((state) => state.setPostFormValues);
