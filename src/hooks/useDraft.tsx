import { saveDraft } from '@/lib/api';
import useSWRMutation from 'swr/mutation';

export const useDraft = (queryParams: string) => {
  const {
    data: draft,
    trigger: triggerDraft,
    isMutating: isSavingDraft,
    error: saveDraftError,
  } = useSWRMutation(`api/draft?${queryParams}`, saveDraft);

  return {
    draft,
    triggerDraft,
    isSavingDraft,
    saveDraftError,
  };
};
