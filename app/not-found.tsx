import type { Metadata } from 'next';
import NotFoundView from '@/components/NotFoundView/NotFoundView';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist in Note Hub.',
};

const NotFound = () => {
  return <NotFoundView />;
};

export default NotFound;
