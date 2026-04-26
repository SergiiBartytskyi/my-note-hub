import Container from '@/components/Container/Container';

type Props = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

const NotesLayout = ({ sidebar, children }: Props) => {
  return (
    <Container>
      {/* <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] rounded-2xl border border-border bg-surface p-4 shadow-sm backdrop-blur md:p-6"> */}
      {/* <aside>{sidebar}</aside> */}
      <div className="flex flex-col gap-4">{children}</div>
    </Container>
  );
};

export default NotesLayout;
