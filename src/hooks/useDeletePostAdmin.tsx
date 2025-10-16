import { deletePostAdmin } from '@/lib/api';
import { useLoadMore } from './useLoadMore';
import { toaster } from '@/components/admin/Toaster/Toaster';
import useSWRMutation from 'swr/mutation';
export const useDeletePostAdmin = () => {
  const { mutate } = useLoadMore({ endpoint: '/api/admin/posts', limit: 6 });
  const { trigger, isMutating, data, error } = useSWRMutation(
    '/api/admin/posts',
    deletePostAdmin,
    {
      onSuccess: () => {
        toaster.create({
          type: 'success',
          title: 'Post deleted successfully',
        });
        mutate();
      },
      onError: (error) => {
        toaster.create({
          type: 'error',
          title: error.message,
        });
      },
    },
  );

  return {
    deleteTrigger: trigger,
    isDeletingPost: isMutating,
    deletedPost: data,
    deletePostError: error,
  };
};
