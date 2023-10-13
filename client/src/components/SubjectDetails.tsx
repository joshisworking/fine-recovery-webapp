import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Subject } from '../interfaces/iSubject';
import ConfirmationModal from './ConfirmationModal';
import { Fine } from '../interfaces/iFine';
import FinesTable from './FinesTable';

const SubjectDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState<Subject | null>(null);
  const [existingSubject, setExistingSubject] = useState(false);
  const [messageClassName, setMessageClassName] = useState('message');
  const [showModal, setShowModal] = useState(false);
  const [subjectDeleted, setSubjectDeleted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(
    'Are you sure you would like to delete this subject?'
  );
  const [fines, setFines] = useState<Fine[] | null>(null);
  const [fineMessage, setFineMessage] = useState('');

  const subjectUrl = 'http://localhost:5000/subject/';
  const fineUrl = 'http://localhost:5000/fine/subject/';

  const navigateBackToSubjects = () => {
    navigate('/subject');
  };

  function setBlankSubject() {
    setSubject({
      name: '',
      dob: '',
    });
  }

  const fetchSubject = () => {
    let subjectFound = false;
    if (id != 'add') {
      subjectFound = true;
      setExistingSubject(subjectFound);

      fetch(subjectUrl + id)
        .then(response => {
          if (!response.ok) {
            setMessage('Error: Subject with Id: ' + id + ' not found.');
          }
          return response.json();
        })
        .then(data => {
          if (data.message !== 'Error: Subject not found') {
            setSubject(data);
          }
        });
    } else {
      setBlankSubject();
    }

    // Get the subject's fines
    if (subjectFound) {
      fetch(`${fineUrl}${id}`)
        .then(response => response.json())
        .then(data => {
          if (!data.message) {
            setFines(data);
          }
        });
    }
  };

  useEffect(() => {
    fetchSubject();
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSubject(prevSub => {
      return {
        ...prevSub,
        [name]: value,
      };
    });
  };

  const setMessageFail = () => {
    setMessageClassName('message fail');
  };

  const submitUpdate: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault();
    setMessage('');

    if (subject === null) {
      setMessage('Error: Subject cannot be saved. Please reload and try again');
      setMessageFail();
      return;
    } else if (subject.name == null || subject.name.trim() === '') {
      setMessage('Error: Subject name must be added');
      setMessageFail();
      return;
    } else if (Date.parse(subject.dob) > Date.now()) {
      setMessage('Error: Subject DOB must be in the past');
      setMessageFail();
      return;
    }

    const requestOptions = {
      method: existingSubject ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subject),
    };

    fetch(subjectUrl, requestOptions)
      .then(response => {
        if (response.ok) {
          setMessageClassName('message success');
          setExistingSubject(true);
        } else {
          setMessageClassName('message fail');
        }
        return response.json();
      })
      .then(data => {
        setSubject(prevSub => {
          return {
            ...prevSub,
            subjectId: data.subjectId,
          };
        });
        setMessage(data.message);
      });
  };

  const deleteSubject = () => {
    setMessage('');
    let message = '';
    const url = 'http://localhost:5000/subject/' + subject?.subjectId;
    const requestOptions = {
      method: 'DELETE',
    };

    fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          setSubjectDeleted(true);
          message =
            'Subject successfully deleted. Close this box to return to fines.';
          setMessageClassName('message success');
        } else {
          message = 'Subject could not be deleted';
          setMessageClassName('message fail');
        }
        setConfirmationMessage(message);
        setMessage(message);
        return response.json();
      })
      .then(data => console.log(data));
  };

  const closeConfrimationModal = () => {
    if (subjectDeleted) {
      navigateBackToSubjects();
    } else {
      setShowModal(!showModal);
    }
  };

  if (subject == null) {
    return (
      <div
        className="message fail"
        id="message">
        {message}
      </div>
    );
  } else {
    return (
      <>
        <div className="form-container">
          <h1>{subject.name}</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={subject.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={subject.dob === null ? '' : subject.dob}
                onChange={handleInputChange}
                pattern="\d{4}-\d{2}-\d{2}"
                placeholder="YYYY-MM-DD"
              />
            </div>
            <button
              className="submit"
              id="submit"
              onClick={submitUpdate}>
              Submit
            </button>
            {existingSubject ? (
              <button
                className="delete"
                onClick={e => {
                  e.preventDefault();
                  if (fines !== null) {
                    setMessage('Error: Cannot delete subject if fines exist.');
                    setMessageFail();
                    return;
                  }
                  setShowModal(!showModal);
                }}>
                Delete
              </button>
            ) : (
              <></>
            )}
            <button
              type="button"
              className="cancel"
              onClick={navigateBackToSubjects}>
              Exit
            </button>
          </form>
        </div>
        <div
          className={messageClassName}
          id="message">
          {message}
        </div>
        <div className="fine-container">
          <h2>Fines</h2>
          <p className="message fail">{fineMessage}</p>
          {fines == null ? (
            <p>No fines for selected subject</p>
          ) : (
            <FinesTable fines={fines} />
          )}
        </div>

        <ConfirmationModal
          show={showModal}
          title="Confirm delete fine"
          message={confirmationMessage}
          handleConfirm={deleteSubject}
          handleClose={closeConfrimationModal}
        />
      </>
    );
  }
};

export default SubjectDetails;
