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

  const toggleModal = () => {
    setShowModal(!showModal);
    console.log('toggled: ' + showModal);
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
        CourthouseId: selectedId,
        CourthouseName: selectedName,
      };
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
          <form
            action="PLACE"
            method="put">
            <div className="input-wrapper">
              <label htmlFor="FineId">Fine ID</label>
              <input
                type="number"
                id="FineId"
                name="FineId"
                value={fine.FineId}
                readOnly
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="Amount">Amount</label>
              <input
                type="number"
                id="Amount"
                name="Amount"
                value={fine.Amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="Date">Date</label>
              <input
                type="text"
                id="Date"
                name="Date"
                value={fine.Date}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="CourtFile">Court File</label>
              <input
                type="text"
                id="CourtFile"
                name="CourtFile"
                value={fine.CourtFile}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="CourthouseId">Courthouse Name</label>
              {courthouses != null ? (
                <select
                  id="CourthouseId"
                  name="CourthouseId"
                  value={
                    courthouses.find(
                      courthouse =>
                        courthouse.CourthouseId === fine.CourthouseId
                    )?.Name
                  }
                  onChange={e => {
                    const selectedName = e.target.value; // Selected Courthouse Name
                    const selectedId =
                      courthouses.find(
                        courthouse => courthouse.Name === selectedName
                      )?.CourthouseId || 0; // Default to 0 if CourthouseId is not found
                    handleCourthouseChange(selectedName, selectedId);
                  }}>
                  {courthouses.map(court => (
                    <option
                      key={court.CourthouseId}
                      value={court.Name}>
                      {court.Name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>Error: Courthouses could not be loaded</p>
              )}
            </div>
            <div className="input-wrapper">
              <label htmlFor="SubjectName">Subject Name</label>
              <input
                type="text"
                id="SubjectName"
                name="SubjectName"
                value={fine.SubjectName}
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
              <label htmlFor="DatePaid">Date Paid</label>
              <input
                type="text"
                id="DatePaid"
                name="DatePaid"
                value={fine.DatePaid === null ? '' : fine.DatePaid}
                onChange={handleInputChange}
              />
            </div>
            <button
              className="submit"
              type="button">
              Submit (NOT CONFIGURED)
            </button>
            <button
              type="button"
              className="cancel"
              onClick={navigateBack}>
              Cancel
            </button>
          </form>
        </div>
        <ChangeSubjectModal
          handleClose={toggleModal}
          show={showModal}
        />
      </>
    );
  }
};

export default FineDetails;
