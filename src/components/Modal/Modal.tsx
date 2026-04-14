import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import Button from '../Button/Button';

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
}
const MovieModal = ({ onClose, children }: ModalProps) => {
  useEffect(() => {
    const scrollY = window.scrollY;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';

      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex min-h-dvh items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
    >
      <div
        className="relative max-h-[90dvh] w-full max-w-125 overflow-auto rounded-lg bg-white p-6 shadow-lg dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <Button
          variant="ghost"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 h-8 w-8 rounded-md p-0 text-xl leading-none"
        >
          <span aria-hidden="true">&times;</span>
        </Button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default MovieModal;
