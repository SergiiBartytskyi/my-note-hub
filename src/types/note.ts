export const NOTE_TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;
export type NoteTag = (typeof NOTE_TAGS)[number];

export const ROUTE_TAGS = ['all', ...NOTE_TAGS] as const;
export type RouteTag = (typeof ROUTE_TAGS)[number];

export const SORT_OPTIONS = ['created', 'updated'] as const;
export type SortBy = (typeof SORT_OPTIONS)[number];

export interface NoteDto {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: NoteTag | '';
}
