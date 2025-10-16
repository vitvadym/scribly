import { usePostStore, usePostFormValues } from '@/store/usePost';
import { ChangeEvent, KeyboardEvent } from 'react';
import styles from './EditorHeaderForm.module.css';
import { setSlug } from '@/utils/client-utils';
import { getEditorInstance } from '@/lib/editor';

export default function EditorInputTitle() {
  const editor = getEditorInstance()
  const postTitle = usePostStore((state) => state.title);
  const setPostTitle = usePostFormValues();
  
  if (!editor) return;

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const title = event.target.value;
    setPostTitle({ title, slug: setSlug(title) });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      editor.commands.focus('start');
    }
  };

  return (
    <input
      className={styles.inputTitle}
      value={postTitle || ''}
      onChange={handleChangeTitle}
      onKeyDown={handleKeyDown}
      name='title'
      placeholder='Title'
    />
  );
}
