import {
  NOTE_TAGS,
  ROUTE_TAGS,
  SORT_OPTIONS,
  type NoteTag,
  type RouteTag,
  type SortBy,
} from '@/types/note';

export function isNoteTag(value: unknown): value is NoteTag {
  return typeof value === 'string' && NOTE_TAGS.includes(value as NoteTag);
}

export function isSortBy(value: unknown): value is SortBy {
  return typeof value === 'string' && SORT_OPTIONS.includes(value as SortBy);
}

export function isRouteTag(value: unknown): value is RouteTag {
  return typeof value === 'string' && ROUTE_TAGS.includes(value as RouteTag);
}
