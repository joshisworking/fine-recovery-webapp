import { createPortal } from 'react-dom';
import iModal from '../interfaces/iModal';
import { useEffect } from 'react';

const ChangeSubjectModal: React.FC<iModal> = ({
  show,
  handleClose: onCloseHandler,
}) => {
  function onSaveHandler() {
    console.log('Save clicked');
  }

  useEffect(() => {
    fetch;
  });

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
          <main className="modal-body">
            <form action="">
              <div className="input-wrapper">
                <label htmlFor=""></label>
                <input
                  type="text"
                  className="firstName"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor=""></label>
                <input
                  type="text"
                  className="lastName"
                />
              </div>
            </form>
          </main>
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
