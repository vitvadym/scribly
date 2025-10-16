import { toggleFeaturePost } from '@/lib/api';
import useSWRMutation from 'swr/mutation';
import { useLoadMore } from './useLoadMore';
import { toaster } from '@/components/admin/Toaster/Toaster';

export const useToggleFeaturePost = () => {
  const { mutate } = useLoadMore({ endpoint: '/api/admin/posts' , limit: 6});

  const {
    data: updatedPost,
    isMutating: isUpdatingPost,
    trigger: toggleFeaturedTrigger,
  } = useSWRMutation(`/api/admin/posts/featured`, toggleFeaturePost, {
    onSuccess: () => {
      toaster.create({
        type: 'success',
        title: 'Post updated successfully',
      });
      mutate();
    },
    onError: (error) => {
      toaster.create({
        type: 'error',
        title: error.message,
      });
    },
  });

  return {
    updatedPost,
    isUpdatingPost,
    toggleFeaturedTrigger,
  };
};
