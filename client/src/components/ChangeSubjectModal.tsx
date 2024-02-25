import { createPortal } from 'react-dom';
import { ShortSubject } from '../interfaces/iSubject';
import { ChangeEvent, useEffect, useState } from 'react';

interface modalProps {
  show: Boolean;
  message: string;
  handleClose: (subject: ShortSubject | null) => void;
}

const ChangeSubjectModal: React.FC<modalProps> = ({
  show,
  handleClose: onCloseHandler,
}) => {
  const [searchString, setSearchString] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [subjectResultsList, setSubjectResultsList] = useState<
    ShortSubject[] | null
  >(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );

  function onSaveHandler() {
    const subject = subjectResultsList?.find(subject => {
      return subject.subjectId === selectedSubjectId;
    });
    console.log(subject);
    subject ? onCloseHandler(subject) : onCloseHandler(null);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const searchSubjects: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault();
    if (searchString.trim() === '' || searchString.length < 2) {
      setSearchMessage('Enter two or more letters to search');
      return;
    }
    let resultsFound = false;
    setSubjectResultsList(null);
    const url = 'http://localhost:5000/subject?search=' + searchString;
    fetch(url, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          resultsFound = true;
        } else {
          setSearchMessage('No results found');
        }
        return response.json();
      })
      .then(data => {
        if (resultsFound) {
          setSubjectResultsList(data);
          setSelectedSubjectId(data ? data[0].subjectId : null);
          console.log(selectedSubjectId);
        }
      });
  };

  return createPortal(
    <>
      <div
        className={
          'modal-container' + (show ? ' modal-active' : ' modal-inactive')
        }
        onClick={() => onCloseHandler(null)}>
        <div
          className="modal"
          onClick={e => {
            e.stopPropagation();
          }}>
          <header className="modal-header">Change Subject</header>
          <main className="modal-body">
            <form onSubmit={e => e.preventDefault()}>
              <div className="input-wrapper">
                <label htmlFor="search-string">Search String</label>
                <input
                  type="text"
                  className="search-string"
                  id="search-string"
                  value={searchString}
                  onChange={handleInputChange}
                  onKeyDown={key => {
                    if (key.key === 'Enter') {
                      document.getElementById('search-subjects')?.click();
                    }
                  }}
                />
                <button
                  id="search-subjects"
                  className="search-subjects"
                  type="button"
                  onClick={searchSubjects}>
                  Search
                </button>
              </div>
              <div className="input-wrapper">
                <label htmlFor="">Choose subject</label>
                <select
                  value={
                    selectedSubjectId == null
                      ? ''
                      : subjectResultsList?.find(
                          subject => subject.subjectId === selectedSubjectId
                        )?.name
                  }
                  onChange={e => {
                    const subjectName = e.target.value;
                    const newSubject = subjectResultsList?.find(subject => {
                      return subject.name === subjectName;
                    });

                    if (newSubject != null) {
                      setSelectedSubjectId(newSubject.subjectId);
                    }
                  }}>
                  {subjectResultsList != null
                    ? subjectResultsList.map(subject => (
                        <option
                          key={subject.subjectId}
                          value={subject.name}>
                          {subject.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </form>
            <p className="message">{searchMessage}</p>
          </main>
          <footer className="modal-footer">
            <button
              className="save"
              onClick={onSaveHandler}>
              Save
            </button>
            <button
              className="close"
              onClick={() => onCloseHandler(null)}>
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
