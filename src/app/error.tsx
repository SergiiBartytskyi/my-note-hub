'use client';

import Container from '@/components/Container/Container';
import { ErrorProps } from '@/types/commonTypes';

const GlobalError = ({ error, reset }: ErrorProps) => {
  return (
    <html lang="en">
      <body>
        <main>
          <Container>
            <h2>Error fetching notes</h2>
            <p>{error.message}</p>
            <button onClick={reset}>Try again</button>
          </Container>
        </main>
      </body>
    </html>
  );
};
export default GlobalError;
