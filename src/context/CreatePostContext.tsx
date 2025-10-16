'use client';

import { Category } from '@/db/schema/category';
import { Asset } from '@/db/schema/asset';
import { createContext, useState, useMemo, useContext, useEffect } from 'react';

type CreatePostType = {
  title: string;
  content: string;
  category: Category | null;
  asset: Pick<Asset, 'url' | 'publicId' | 'assetId'> | null;
  slug?: string;
  description: string;
  isEditing?: boolean;
};

type CreatePostContextType = CreatePostType & {
  setPostFormValues: React.Dispatch<React.SetStateAction<CreatePostType>>;
  reset: () => void;
};

export const initValues: CreatePostType = {
  title: '',
  content: '',
  category: null,
  asset: null,
  slug: '',
  description: '',
  isEditing: false,
};

export const CreatePostContext = createContext<CreatePostContextType>({
  ...initValues,
  setPostFormValues: () => {},
  reset: () => {},
});

export const CreatePostContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formValues, setPostFormValues] = useState<CreatePostType>(initValues);

  useEffect(() => {
    const draft = localStorage.getItem('draft');

    if (typeof window !== 'undefined' && draft) {
      setPostFormValues(JSON.parse(draft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('draft', JSON.stringify(formValues));
  }, [formValues]);

  const reset = () => {
    setPostFormValues(initValues);
    localStorage.removeItem('draft');
  };

  const value = useMemo<CreatePostContextType>(() => {
    return {
      ...formValues,
      reset,
      setPostFormValues,
    };
  }, [formValues]);

  return (
    <CreatePostContext.Provider value={value}>
      {children}
    </CreatePostContext.Provider>
  );
};

export const useCreatePostContext = () => useContext(CreatePostContext);
