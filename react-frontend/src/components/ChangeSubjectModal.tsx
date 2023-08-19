import { createPortal } from 'react-dom';
import iModal from '../interfaces/iModal';

const ChangeSubjectModal: React.FC<iModal> = ({
  show,
  handleClose: onCloseHandler,
}) => {
  function onSaveHandler() {
    console.log('Save clicked');
  }

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
          <header className="modal-header">Change Subject</header>
          <main className="modal-body">TODO: Change subject here.</main>
          <footer className="modal-footer">
            <button
              className="save"
              onClick={onSaveHandler}>
              Save
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

export default ChangeSubjectModal;
