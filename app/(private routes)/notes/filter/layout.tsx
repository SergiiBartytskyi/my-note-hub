import Container from '@/components/Container/Container';

type Props = {
  children: React.ReactNode;
};

const NotesLayout = ({ children }: Props) => {
  return (
    <Container>
      <div className="flex flex-col gap-4">{children}</div>
    </Container>
  );
};

export default NotesLayout;
