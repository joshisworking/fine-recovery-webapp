import { createPortal } from 'react-dom';

type ConfirmationModalProps = {
  show: boolean;
  message?: string;
  handleClose: () => void;
  handleConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  message,
  handleClose: onCloseHandler,
  handleConfirm,
}) => {
  if (!show) return null;

  return createPortal(
    <>
      <div
        className={
          'modal-container' + (show ? ' modal-active' : ' modal-inactive')
        }
        onClick={() => onCloseHandler()}>
        <div
          className="modal"
          onClick={e => {
            e.stopPropagation();
          }}>
          <header className="modal-header">Confrim delete fine</header>
          <main className="modal-body">{message}</main>
          <footer className="modal-footer">
            <button
              className="save"
              onClick={handleConfirm}>
              Delete
            </button>
            <button
              className="close"
              onClick={onCloseHandler}>
              Close
            </button>
          </footer>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ConfirmationModal;
