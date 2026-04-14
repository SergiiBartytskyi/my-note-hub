import type { NoteDto } from '../../types/note';
import NoteItem from '../NoteItem/NoteItem';

interface NoteListProps {
  notes: NoteDto[];
  onDelete: (id: string) => void;
}

const NoteList = ({ notes, onDelete }: NoteListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {notes.map(({ id, title, content, tag }) => (
        <NoteItem key={id} id={id} title={title} content={content} tag={tag} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default NoteList;
