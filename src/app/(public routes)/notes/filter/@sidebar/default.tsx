import Link from 'next/link';
// import { getCategories } from '@/lib/noteService';
import type { NoteTag } from '@/types/note';

export const noteTags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const NotesSidebar = async () => {
  // const categories = await getCategories();
  // console.log('categories :>> ', categories);
  return (
    <ul>
      <li>
        <Link href={`/notes/filter/all`}>All notes</Link>
      </li>

      {/* {categories.map(category => (
        <li key={category.id}>
          <Link href={`/notes/filter/${category.id}`}>{category.name}</Link>
        </li>
      ))} */}

      {noteTags.map(tag => (
        <li key={tag}>
          <Link href={`/notes/filter/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
