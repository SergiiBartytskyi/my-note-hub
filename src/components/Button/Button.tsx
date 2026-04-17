import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600 focus-visible:ring-offset-slate-50 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:ring-blue-500 dark:hover:focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-950 active:bg-blue-700 dark:active:bg-blue-500',

  secondary:
    'border border-slate-300 hover:border-slate-400 bg-white text-slate-800 hover:bg-slate-50 focus-visible:ring-blue-600 focus-visible:ring-offset-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-blue-500 dark:hover:focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-950 active:bg-slate-50 dark:active:bg-slate-900',

  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 focus-visible:ring-offset-slate-50 dark:bg-red-600 dark:hover:bg-red-500 dark:focus-visible:ring-red-500 dark:hover:focus-visible:ring-red-500 dark:focus-visible:ring-offset-slate-950 active:bg-red-700 dark:active:bg-red-500',

  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-blue-600 focus-visible:ring-offset-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-blue-500 dark:hover:focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-950 active:bg-slate-100 dark:active:bg-slate-800',
};

const Button = ({
  variant = 'primary',
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
