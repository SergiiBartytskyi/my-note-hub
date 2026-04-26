import Container from '../Container/Container';

const Footer = () => {
  return (
    <footer className="border-t border-border py-4 sm:py-6 lg:py-8">
      <Container>
        <div className="space-y-2 text-center text-sm text-slate-600 dark:text-slate-300">
          <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
          <p>Developer: Sergii Bartytskyi</p>
          <p>
            Contact:{' '}
            <a
              href="mailto:s.bartycjkyj@gmail.com"
              className="font-semibold text-blue-600 no-underline hover:underline dark:text-blue-400"
            >
              s.bartycjkyj@gmail.com
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
