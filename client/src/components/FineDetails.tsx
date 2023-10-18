import React, { useState, useEffect, ChangeEvent } from 'react';
import { Courthouse } from '../interfaces/iCourthouse';
import { useParams, useNavigate } from 'react-router-dom';
import setTitle from '../utils/setTitle';
import ConfirmationModal from './ConfirmationModal';
import ChangeSubjectModal from './ChangeSubjectModal';
import { ShortSubject } from '../interfaces/iSubject';
import { Fine } from '../interfaces/iFine';

const FineDetails: React.FC = () => {
  setTitle('Fine details');

  const { id } = useParams();
  const navigate = useNavigate();

  const [courthouses, setCourthouses] = useState<Courthouse[] | null>(null);
  const [fine, setFine] = useState<Fine | null>(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [messageClassName, setMessageClassName] = useState('message');
  const [showChangeSubjectModal, setShowChangeSubjectModal] = useState(false);
  const [fineDeleted, setFineDeleted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(
    'Are you sure you would like to delete this fine?'
  );
  const [existingFine, setExistingFine] = useState(false);
  const fineUrl = 'http://localhost:5000/fine';

  const navigateBackToFines = () => {
    navigate('/fine');
  };

  const setBlankFine = () => {
    setFine({
      amount: 0,
      date: new Date().toISOString().substring(0, 10),
      courthouseId: -1,
      courthouseName: '',
      courtFile: '',
      subjectName: '',
      datePaid: null,
    });
  };

  const fetchFine = () => {
    if (id != 'add') {
      setExistingFine(true);
      fetch('http://localhost:5000/fine/' + id)
        .then(response => {
          if (!response.ok) {
            setMessage('Error: Fine with Id: ' + id + ' not found.');
          }
          return response.json();
        })
        .then(data => {
          if (data.message !== 'Fine not found') {
            setFine(data);
          }
        });
    } else {
      setBlankFine();
    }
  };

  // If page not loaded from add fine url, fetch fine
  useEffect(fetchFine, [id]);

  useEffect(() => {
    const testStorage = sessionStorage.getItem('courthouses');

    if (testStorage) {
      setCourthouses(JSON.parse(testStorage));
    } else {
      fetch('http://localhost:5000/courthouse')
        .then(response => response.json())
        .then(data => {
          sessionStorage.setItem('courthouses', JSON.stringify(data));
          setCourthouses(data);
        });
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFine(prevFine => {
      return {
        ...prevFine,
        [name]: value,
      };
    });
  };

  const handleCourthouseChange = (selectedName: string, selectedId: number) => {
    setFine(prevFine => {
      return {
        ...prevFine,
        courthouseId: selectedId,
        courthouseName: selectedName,
      };
    });
  };

  const setMessageFail = () => {
    setMessageClassName('message fail');
  };

  const submitUpdate: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault();
    setMessage('');

    if (fine === null) {
      setMessage('Error: Fine cannot be saved. Please try again later.');
      setMessageFail();
      return;
    } else if (fine.amount == null || fine.amount <= 0) {
      setMessage('Error: Fine amount must be greater than 0');
      setMessageFail();
      return;
    } else if (fine.date == null || fine.date.trim() === '') {
      setMessage('Error: Fine date must be added');
      setMessageFail();
      return;
    } else if (Date.parse(fine.date) > Date.now()) {
      setMessage('Error: Fine date must be in the past');
      setMessageFail();
      return;
    } else if (fine.courtFile.trim() === '' || fine.courtFile == null) {
      setMessage('Error: Court file number must be entered');
      setMessageFail();
      return;
    } else if (fine.courthouseName == null) {
      setMessage('Error: Courthouse must be selected');
      setMessageFail();
      return;
    } else if (
      fine.subjectId == null ||
      fine.subjectName == null ||
      fine.subjectId <= 0
    ) {
      setMessage('Error: Fine subject must be selected');
      setMessageFail();
      return;
    }

    const requestOptions = {
      method: existingFine ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fine),
    };

    fetch(fineUrl, requestOptions)
      .then(response => {
        if (response.ok) {
          setMessageClassName('message success');
        } else {
          setMessageClassName('message fail');
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.message);
      });
  };

  const deleteFine = () => {
    setMessage('');
    let message = '';
    const url = 'http://localhost:5000/fine/' + fine?.fineId;
    const requestOptions = {
      method: 'DELETE',
    };

    fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          setFineDeleted(true);
          message =
            'Fine successfully deleted. Close this box to return to fines.';
          setMessageClassName('message success');
        } else {
          message = 'Fine could not be deleted';
          setMessageClassName('message fail');
        }
        setConfirmationMessage(message);
        setMessage(message);
        return response.json();
      })
      .then(data => console.log(data));
  };

  const closeConfrimationModal = () => {
    if (fineDeleted) {
      navigateBackToFines();
    } else {
      setShowModal(!showModal);
    }
  };

  const closeSubjectModal = (subject: ShortSubject | null) => {
    if (subject != null) {
      const name = subject.name;
      const id = subject.subjectId;

      setFine(prevFine => {
        return {
          ...prevFine,
          subjectId: id,
          subjectName: name,
        };
      });
    }
    setShowChangeSubjectModal(!showChangeSubjectModal);
  };

  const handleChangeSubject: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    event.preventDefault();
    setShowChangeSubjectModal(true);
  };

  if (fine === null) {
    return (
      <div
        className="message fail"
        id="message">
        {message}
      </div>
    );
  } else if (courthouses === null) {
    return <div>Error: Courthouses could not be fetched</div>;
  } else {
    return (
      <>
        <div className="form-container">
          <h1>Fine Details</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="fineId">Fine ID</label>
              <p>{fine.fineId}</p>
            </div>
            <div className="input-wrapper">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={fine.amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={fine.date}
                onChange={handleInputChange}
                pattern="\d{4}-\d{2}-\d{2}"
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="courtFile">Court File</label>
              <input
                type="text"
                id="courtFile"
                name="courtFile"
                value={fine.courtFile}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="courthouseId">Courthouse Name</label>
              {courthouses != null ? (
                <select
                  id="courthouseId"
                  name="courthouseId"
                  value={
                    courthouses.find(
                      courthouse =>
                        courthouse.courthouseId === fine.courthouseId
                    )?.name
                  }
                  onChange={e => {
                    const selectedName = e.target.value; // Selected Courthouse Name
                    const selectedId =
                      courthouses.find(
                        courthouse => courthouse.name === selectedName
                      )?.courthouseId || 0; // Default to 0 if courthouseId is not found
                    handleCourthouseChange(selectedName, selectedId);
                  }}>
                  {courthouses.map(court => (
                    <option
                      key={court.courthouseId}
                      value={court.name}>
                      {court.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>Error: Courthouses could not be loaded</p>
              )}
            </div>
            <div className="input-wrapper">
              <label htmlFor="subjectName">Subject Name</label>
              <input
                type="text"
                id="subjectName"
                name="subjectName"
                value={fine.subjectName}
                readOnly
              />

              <button
                className="btn-edit-subject"
                type="button"
                onClick={handleChangeSubject}>
                <img src="../editing.png" />
              </button>
            </div>
            <div className="input-wrapper">
              <label htmlFor="datePaid">Date Paid</label>
              <input
                type="date"
                id="datePaid"
                name="datePaid"
                value={fine.datePaid === null ? '' : fine.datePaid}
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
            {existingFine ? (
              <button
                className="delete"
                onClick={e => {
                  e.preventDefault();
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
              onClick={navigateBackToFines}>
              Exit
            </button>
          </form>
        </div>
        <div
          className={messageClassName}
          id="message">
          {message}
        </div>
        <ConfirmationModal
          show={showModal}
          title="Confirm delete fine"
          message={confirmationMessage}
          handleConfirm={deleteFine}
          handleClose={closeConfrimationModal}
        />
        <ChangeSubjectModal
          show={showChangeSubjectModal}
          handleClose={closeSubjectModal}
          message=""
        />
      </>
    );
  }
};

export default FineDetails;
