import React, { useState, useEffect, ChangeEvent } from 'react';
import { Fine } from './Fines';
import { Courthouse } from './Courthouses';
import { useParams, useNavigate } from 'react-router-dom';
import setTitle from '../utils/setTitle';
import ChangeSubjectModal from './ChangeSubjectModal';

const FineDetails: React.FC = () => {
  setTitle('Fine details');

  const { id } = useParams();
  const navigate = useNavigate();

  const [fine, setFine] = useState<Fine | null>(null);
  const [courthouses, setCourthouses] = useState<Courthouse[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const navigateBack = () => {
    navigate('/fine');
  };

  useEffect(() => {
    fetch('http://localhost:5000/fine/' + id)
      .then(response => response.json())
      .then(data => {
        setFine(data);
      });
  }, [id]);

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
      if (!prevFine) {
        return null;
      }

      return {
        ...prevFine,
        [name]: value,
      };
    });
  };

  const handleCourthouseChange = (selectedName: string, selectedId: number) => {
    setFine(prevFine => {
      if (!prevFine) {
        return null;
      }

      return {
        ...prevFine,
        courthouseId: selectedId,
        courthouseName: selectedName,
      };
    });
  };

  const submitUpdate: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault();
    setMessage('');
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fine),
    };

    fetch('http://localhost:5000/fine', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMessage(data.message);
      });
  };

  if (fine === null) {
    return <div>Error: Fine with id {id} not found</div>;
  } else if (courthouses === null) {
    return <div>Error: Courthouses could not be fetched</div>;
  } else {
    return (
      <>
        <div>
          <h1>Fine Details</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="fineId">Fine ID</label>
              <input
                type="number"
                id="fineId"
                name="fineId"
                value={fine.fineId}
                readOnly
              />
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
                onClick={toggleModal}
                type="button">
                <img
                  src="/editing.png"
                  alt="Edit subject"
                />
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
            <button
              type="button"
              className="cancel"
              onClick={navigateBack}>
              Exit
            </button>
          </form>
        </div>
        <div className="message">{message}</div>
        <ChangeSubjectModal
          handleClose={toggleModal}
          show={showModal}
        />
      </>
    );
  }
};

export default FineDetails;
