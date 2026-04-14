'use client';

type Props = {
  error: Error;
  reset: () => void;
};

const NotesError = ({ error, reset }: Props) => {
  return (
    <div>
      <h2>Error fetching notes</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
};
export default NotesError;
