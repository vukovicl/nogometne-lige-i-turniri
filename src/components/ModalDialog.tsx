import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: 'md' | 'lg' | 'xl';
  children: ReactNode;
}

export function ModalDialog({
  open,
  onClose,
  title,
  subtitle,
  maxWidth = 'lg',
  children,
}: ModalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      onClose();
    };

    dialog.addEventListener('close', handleClose);

    // Fallback za preglednike koji još ne podržavaju deklarativni `closedby="any"` (npr. Safari)
    let cleanupLightDismiss: (() => void) | undefined;
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      let pressedOutside = false;
      const isOutside = (event: PointerEvent) => {
        const rect = dialog.getBoundingClientRect();
        return (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        );
      };
      const onPointerDown = (event: PointerEvent) => {
        pressedOutside = event.target === dialog && isOutside(event);
      };
      const onPointerUp = (event: PointerEvent) => {
        if (pressedOutside && event.target === dialog && isOutside(event)) {
          dialog.close();
        }
        pressedOutside = false;
      };
      dialog.addEventListener('pointerdown', onPointerDown);
      dialog.addEventListener('pointerup', onPointerUp);
      cleanupLightDismiss = () => {
        dialog.removeEventListener('pointerdown', onPointerDown);
        dialog.removeEventListener('pointerup', onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
      cleanupLightDismiss?.();
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: 'any' } as Record<string, string>)}
      aria-labelledby={titleId}
      className={`nlt-dialog nlt-dialog--${maxWidth}`}
    >
      <div className="nlt-dialog__header">
        <div>
          {subtitle && <p className="nlt-dialog__eyebrow">{subtitle}</p>}
          <h1 id={titleId} className="nlt-dialog__title">
            {title}
          </h1>
        </div>
        <button
          type="button"
          className="nlt-dialog__close"
          onClick={() => dialogRef.current?.close()}
          aria-label="Zatvori prozor"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="nlt-dialog__body">{children}</div>
    </dialog>
  );
}
