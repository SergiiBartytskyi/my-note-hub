'use client';

import Container from '../Container/Container';
import ThemeToggle from '../ThemeToggle';

const Footer = () => {
  return (
    <footer className="border-t border-border py-4">
      <Container>
        <div className="relative flex flex-1 flex-col items-center justify-center space-y-2 text-center text-sm text-slate-600 dark:text-slate-300">
          <div className="md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2">
            <ThemeToggle />
          </div>

          <div className="flex flex-col space-y-1">
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
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
