import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Courthouse } from '../interfaces/iCourthouse';
import ConfirmationModal from './ConfirmationModal';
import { Fine } from '../interfaces/iFine';
import FinesTable from './FinesTable';

const CourthouseDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [courthouse, setCourthouse] = useState<Courthouse | null>(null);
  const [existingCourthouse, setExistingCourthouse] = useState(false);
  const [messageClassName, setMessageClassName] = useState('message');
  const [showModal, setShowModal] = useState(false);
  const [courthouseDeleted, setCourthouseDeleted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(
    'Are you sure you would like to delete this courthouse?'
  );
  const [fines, setFines] = useState<Fine[] | null>(null);

  const courthouseUrl = 'http://localhost:5000/courthouse/';
  const fineUrl = 'http://localhost:5000/fine/courthouse/';

  const navigateBackToCourthouses = () => {
    navigate('/courthouse');
  };

  function setBlankCourthouse() {
    setCourthouse({
      name: '',
      city: '',
      province: 'AB',
    });
  }

  const fetchCourthouse = () => {
    let courthouseFound = false;

    if (id != 'add') {
      courthouseFound = true;
      setExistingCourthouse(courthouseFound);

      fetch(`${courthouseUrl}${id}`, { credentials: 'include' })
        .then(response => {
          if (!response.ok) {
            if (response.status == 403) {
              navigate('/');
            }
            setMessage('Error: Courthouse with Id: ' + id + ' not found.');
          }
          return response.json();
        })
        .then(data => {
          if (data.message !== 'Error: Courthouse not found') {
            setCourthouse(data);
          }
        });
    } else {
      setBlankCourthouse();
    }

    // Get the courthouse's fines
    if (courthouseFound) {
      fetch(`${fineUrl}${id}`, { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
          if (!data.message) {
            setFines(data);
          }
        });
    }
  };

  useEffect(() => {
    fetchCourthouse();
  }, [id]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    // @ts-ignore
    setCourthouse(prevCourt => {
      return {
        ...prevCourt,
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

    if (courthouse == null) {
      setMessage(
        'Error: Courthouse cannot be saved. Please reload and try again'
      );
      setMessageFail();
      return;
    } else if (courthouse.city == null || courthouse.city.trim() === '') {
      setMessage('Error: Courthouse city must be added');
      setMessageFail();
      return;
    } else if (courthouse.name == null || courthouse.name.trim() === '') {
      setMessage('Error: Courthouse name must be added');
      setMessageFail();
      return;
    } else if (
      courthouse.province == null ||
      courthouse.province.trim().length !== 2
    ) {
      setMessage('Error: Courthouse province must be added');
      setMessageFail();
      return;
    }

    const requestOptions = {
      method: existingCourthouse ? 'PUT' : 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courthouse),
    };

    // @ts-ignore
    fetch(courthouseUrl, requestOptions)
      .then(response => {
        if (response.ok) {
          if (!existingCourthouse) {
            alert('Courthouse successfully added');
            navigate('/courthouse');
          }
          setMessageClassName('message success');
          setExistingCourthouse(true);
        } else {
          setMessageClassName('message fail');
        }
        return response.json();
      })
      .then(data => {
        // @ts-ignore
        setCourthouse(prevCourt => {
          return {
            ...prevCourt,
            courthouseId: data.courthouseId,
          };
        });
        setMessage(data.message);
      });
  };

  const deleteCourthouse = () => {
    setMessage('');
    let message = '';
    const requestOptions = {
      credentials: 'include',
      method: 'DELETE',
    };

    // @ts-ignore
    fetch(`${courthouseUrl}${id}`, requestOptions).then(response => {
      if (response.ok) {
        setCourthouseDeleted(true);
        message =
          'Courthouse successfully deleted. Close box to return to courthouses.';
        setMessageClassName('message success');
      } else {
        message = 'Courthouse could not be deleted';
        setMessageClassName('message fail');
      }
      setConfirmationMessage(message);
      setMessage(message);
      return response.json();
    });
  };

  const closeConfrimationModal = () => {
    if (courthouseDeleted) {
      navigateBackToCourthouses();
    } else {
      setShowModal(!showModal);
    }
  };

  if (courthouse == null) {
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
          <h1>{id == 'add' ? 'Add Courthouse' : courthouse.name}</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={courthouse.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={courthouse.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="province">Province</label>
              <select
                id="province"
                name="province"
                value={courthouse.province}
                onChange={handleInputChange}>
                <option
                  key="AB"
                  value="AB">
                  Alberta
                </option>
                <option
                  key="BC"
                  value="BC">
                  British Columbia
                </option>
                <option
                  key="MB"
                  value="MB">
                  Manitoba
                </option>
                <option
                  key="NB"
                  value="NB">
                  New Brunswick
                </option>
                <option
                  key="NL"
                  value="NL">
                  Newfoundland
                </option>
                <option
                  key="NS"
                  value="NS">
                  Nova Scotia
                </option>
                <option
                  key="NT"
                  value="NT">
                  Northwest Territories
                </option>
                <option
                  key="NU"
                  value="NU">
                  Nunavut
                </option>
                <option
                  key="ON"
                  value="ON">
                  Ontario
                </option>
                <option
                  key="PE"
                  value="PE">
                  Prince Edward Island
                </option>
                <option
                  key="QC"
                  value="QC">
                  Quebec
                </option>
                <option
                  key="SK"
                  value="SK">
                  Saskatchewan
                </option>
                <option
                  key="YT"
                  value="YT">
                  Yukon
                </option>
              </select>
            </div>
            <button
              className="submit"
              id="submit"
              onClick={submitUpdate}>
              Submit
            </button>
            {existingCourthouse ? (
              <button
                className="delete"
                onClick={e => {
                  e.preventDefault();
                  if (fines?.length !== 0) {
                    setMessage(
                      'Error: Cannot delete courthouse if fines exist.'
                    );
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
              onClick={navigateBackToCourthouses}>
              Exit
            </button>
          </form>
        </div>
        <div
          className={messageClassName}
          id="message">
          {message}
        </div>
        {existingCourthouse ? (
          <div className="fine-container">
            <h2>Fines</h2>
            {fines == null || fines?.length === 0 ? (
              <p>No fines for selected courthouse</p>
            ) : (
              <FinesTable fines={fines} />
            )}
          </div>
        ) : (
          ''
        )}
        <ConfirmationModal
          show={showModal}
          title="Confirm delete fine"
          message={confirmationMessage}
          handleConfirm={deleteCourthouse}
          handleClose={closeConfrimationModal}
        />
      </>
    );
  }
};

export default CourthouseDetails;
