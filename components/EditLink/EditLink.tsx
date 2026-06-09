import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { UrlObject } from 'url';
import clsx from 'clsx';

type EditLinkProps = {
  href: string | UrlObject;
  children?: React.ReactNode;
  className?: string;
};

const EditLink = ({ href, children, className }: EditLinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-blue-600 focus-visible:ring-offset-slate-50',
        'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-950',
        className
      )}
    >
      <Pencil className="h-4 w-4" />
      {children || 'Edit'}
    </Link>
  );
};

export default EditLink;
