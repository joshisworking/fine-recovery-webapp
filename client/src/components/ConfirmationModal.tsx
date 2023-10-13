import { createPortal } from 'react-dom';

type ConfirmationModalProps = {
  show: boolean;
  message?: string;
  title: string;
  handleClose: () => void;
  handleConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  message,
  title,
  handleClose: onCloseHandler,
  handleConfirm,
}) => {
  if (!show) return null;

  const handleDelete = () => {
    const button = document.getElementById('delete-fine');
    if (button) {
      button.style.display = 'none';
    }
    handleConfirm();
  };

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
          <header className="modal-header">{title}</header>
          <main className="modal-body">{message}</main>
          <footer className="modal-footer">
            <button
              id="delete-fine"
              className="save"
              onClick={handleDelete}>
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
