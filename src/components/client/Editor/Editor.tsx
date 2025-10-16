'use client';

import styles from './Editor.module.css';

import { EditorContent } from '@tiptap/react';
import EditorHeaderToolBar from '../EditorHeaderToolBar/EditorHeaderToolBar';
import Spinner from '../Spinner/Spinner';

import EditorInputTitle from '../EditorHeaderForm/EditorInputTitle';
import { getEditorInstance } from '@/lib/editor';

export default function Editor() {
  const editor = getEditorInstance();

  if (!editor) {
    return;
  }

  return (
    <div className={styles.editor}>
      <EditorHeaderToolBar />
      <EditorInputTitle />
      {editor.isEditable ? <EditorContent editor={editor} /> : <Spinner />}
    </div>
  );
}
