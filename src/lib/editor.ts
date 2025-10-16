import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { usePostStore } from '@/store/usePost';
import styles from '../components/client/Editor/Editor.module.css';
import { deleteAsset } from './api';

let editor: Editor | null = null;

export const getEditorInstance = () => {
  if (!editor) {
    editor = new Editor({
      content: '',
      async onTransaction({ editor, transaction }) {
        const currentDoc = editor.state.doc;
        const previousDoc = transaction.docs[0];

        if (!previousDoc || !currentDoc) return;

        const currentImage = currentDoc.content.content.find((node) => {
          return node.type.name === 'image';
        });

        const previousImage = previousDoc.content.content.find((node) => {
          return node.type.name === 'image';
        });

        // title attribute - claudinary asset public id
        const currentId = currentImage?.attrs.title;
        const previousId = previousImage?.attrs.title;

        if (!currentImage && previousImage) {
          usePostStore.setState({ asset: undefined });
          // setFormValues({ asset: null });
        } else if (currentId && previousId && currentId !== previousId) {
          await deleteAsset(previousId);
        }
      },
      extensions: [
        Placeholder.configure({
          placeholder: 'Type something ...',
          emptyEditorClass: styles.empty,
          showOnlyCurrent: false,
          showOnlyWhenEditable: false,
          // emptyNodeClass: styles.empty,
        }),
        StarterKit.configure({
          history: {
            depth: 10,
          },
          bulletList: {
            HTMLAttributes: {
              class: styles.bulletList,
            },
          },
          orderedList: {
            HTMLAttributes: {
              class: styles.orderedList,
            },
          },
          blockquote: {
            HTMLAttributes: {
              class: styles.blockquote,
            },
          },
          codeBlock: {
            HTMLAttributes: {
              class: styles.codeBlock,
            },
          },
        }),
        Underline,
        Image.configure({
          HTMLAttributes: {
            class: styles.image,
          },
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
    });
  }

  return editor;
};
