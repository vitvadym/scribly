import { getEditorInstance } from '@/lib/editor';

export const getEditorActions = () => {
  const editor = getEditorInstance();

  if (editor) {
    const actions = {
      toggleCodeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
      toggleListBullet: () => editor.chain().focus().toggleBulletList().run(),
      toggleListOrdered: () => editor.chain().focus().toggleOrderedList().run(),
      toggleBold: () => editor.chain().focus().toggleBold().run(),
      toggleItalic: () => editor.chain().focus().toggleItalic().run(),
      toggleUnderline: () => editor.chain().focus().toggleUnderline().run(),
      toggleStrike: () => editor.chain().focus().toggleStrike().run(),
      toggleTextAlignLeft: () =>
        editor.chain().focus().toggleTextAlign('left').run(),
      toggleTextAlignCenter: () =>
        editor.chain().focus().toggleTextAlign('center').run(),
      toggleTextAlignRight: () =>
        editor.chain().focus().toggleTextAlign('right').run(),
      toggleQuote: () => editor.chain().focus().toggleBlockquote().run(),
      undoAction: () => editor.chain().focus().undo().run(),
      redoAction: () => editor.chain().focus().redo().run(),
      handleAddImage: (src: string, cloudinaryPublicId: string) =>
        editor
          .chain()
          .focus('start')
          .setImage({ src, title: cloudinaryPublicId })
          .run(),
      isActive: (node: string, options?: Record<string, unknown>) => {
        return editor.isActive(node, options);
      },
    };

    return actions;

    // const toggleListBullet = () =>
    //   editor.chain().focus().toggleBulletList().run();

    // const toggleListOrdered = () =>
    //   editor.chain().focus().toggleOrderedList().run();

    // const toggleBold = () => editor.chain().focus().toggleBold().run();
    // const toggleItalic = () => editor.chain().focus().toggleItalic().run();
    // const toggleUnderline = () =>
    //   editor.chain().focus().toggleUnderline().run();
    // const toggleStrike = () => editor.chain().focus().toggleStrike().run();
    // const toggleTextAlignLeft = () =>
    //   editor.chain().focus().toggleTextAlign('left').run();

    // const toggleTextAlignCenter = () =>
    //   editor.chain().focus().toggleTextAlign('center').run();

    // const toggleTextAlignRight = () =>
    //   editor.chain().focus().toggleTextAlign('right').run();

    // const toggleQuote = () => editor.chain().focus().toggleBlockquote().run();

    // const undoAction = () => editor.chain().focus().undo().run();
    // const redoAction = () => editor.chain().focus().redo().run();

    // const handleAddImage = (src: string, cloudinaryPubclicId: string) =>
    //   editor
    //     .chain()
    //     .focus('start')
    //     .setImage({
    //       src,
    //       title: cloudinaryPubclicId,
    //     })
    //     .run();

    // const isActive = (node: string, options?: Record<string, unknown>) => {
    //   return editor.isActive(node, options);
    // };
  }
  return null;
};

export type EditorActions = ReturnType<typeof getEditorActions>;
