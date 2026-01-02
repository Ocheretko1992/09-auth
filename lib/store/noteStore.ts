// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import type { NoteCreatePayload } from '@/types/note';

// const initialDraft: NoteCreatePayload = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

// interface useNoteDraft {
//   draft: NoteCreatePayload;
//   setDraft: (note: NoteCreatePayload) => void;
//   clearDraft: () => void;
// }

// export const useNoteDraft = create<useNoteDraft>()(
//   persist(
//     set => ({
//       draft: initialDraft,
//       setDraft: note => set(() => ({ draft: note })),
//       clearDraft: () => set(() => ({ draft: initialDraft })),
//     }),
//     {
//       name: 'note-draft',
//       partialize: state => ({ draft: state.draft }),
//     }
//   )
// );




import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '@/types/note';

export const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo' as NoteTag,
};
interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  draft: NoteDraft;
  setDraft: (draft: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,

      setDraft: draft =>
        set(state => ({
          draft: { ...state.draft, ...draft },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);