import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NewNoteData } from '../../types/note';

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (patch: Partial<NewNoteData>) => void;
  clearDraft: () => void;
};

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: patch => set(state => ({ draft: { ...state.draft, ...patch } })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
