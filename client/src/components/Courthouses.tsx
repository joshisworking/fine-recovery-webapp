import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CourthousesTable from './CourthousesTable';
import { Courthouse } from '../interfaces/iCourthouse';

const Courthouses: React.FC = () => {
  const navigate = useNavigate();

  const [allCourthouses, setAllCourthouses] = useState<Courthouse[]>([]);
  const [filterText, setFilterText] = useState('');
  const [filteredCourthouses, setFilteredCourthouses] = useState<Courthouse[]>(
    []
  );
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [message, setMessage] = useState('');

  const courthouseUrl = 'http://localhost:5000/courthouse';

  useEffect(() => {
    document.title = 'Courthouses';
  }, []);

  useEffect(() => {
    fetch(courthouseUrl, { credentials: 'include' })
      .then(response => {
        if (response.status == 403) {
          navigate('/login');
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          setMessage('Error: You must log in to view data');
        } else {
          setUserAuthenticated(true);
          setAllCourthouses(data);
          setFilteredCourthouses(data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (filterText.trim() === '') {
      // When the search text is empty, restore filteredSubjects to match allSubjects
      setFilteredCourthouses(allCourthouses);
    } else {
      // Otherwise, filter based on the search text and update filteredSubjects
      setFilteredCourthouses(
        allCourthouses.filter(
          court =>
            court.name.toLowerCase().includes(filterText.toLowerCase()) ||
            court.city.toLowerCase().includes(filterText.toLowerCase()) ||
            court.province.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    }
  }, [filterText, allCourthouses]);

  return userAuthenticated ? (
    <>
      <div className="heading-container">
        <h1 className="list-header">Courthouses</h1>
        <form
          className="filter-form"
          onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            name="search"
            id="search"
            onChange={e => setFilterText(e.target.value)}
            placeholder="Search Courthouses"
          />
        </form>
        <Link to="/courthouse/add">Add courthouse</Link>
      </div>
      <CourthousesTable courthouses={filteredCourthouses} />
    </>
  ) : (
    <p className="message fail">{message}</p>
  );
};

export default Courthouses;
