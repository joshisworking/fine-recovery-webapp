import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import setTitle from '../utils/setTitle';
import { Fine } from '../interfaces/iFine';
import FinesTable from './FinesTable';

const Fines: React.FC = () => {
  setTitle('Fines');
  const [allFines, setAllFines] = useState<Fine[]>([]);
  const [filterText, setFilterText] = useState('');
  const [unpaidOnly, setUnpaidOnly] = useState(false);

  // Obtain fine data
  useEffect(() => {
    fetch('http://localhost:5000/fine')
      .then(response => response.json())
      .then((data: { results: Fine[] }) => {
        setAllFines(data.results);
        setFilteredFines(data.results);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const [filteredFines, setFilteredFines] = useState<Fine[]>([]);

  useEffect(() => {
    if (filterText.trim() === '') {
      // When the search text is empty, restore filteredFines to match allFines
      setFilteredFines(
        allFines.filter(fine =>
          unpaidOnly ? fine.datePaid === null : fine.fineId
        )
      );
    } else {
      // Otherwise, filter based on the search text and update filteredFines
      setFilteredFines(
        allFines.filter(
          fine =>
            (fine.courthouseName
              .toLowerCase()
              .includes(filterText.toLowerCase()) ||
              fine
                .subjectName!.toLowerCase()
                .includes(filterText.toLowerCase()) ||
              fine.courtFile
                .toLowerCase()
                .includes(filterText.toLowerCase())) &&
            (unpaidOnly ? fine.datePaid === null : fine.fineId)
        )
      );
    }
  }, [filterText, allFines, unpaidOnly]);

  return (
    <>
      <div className="heading-container">
        <h1 className="list-header">Fines</h1>
        <form
          className="filter-form"
          onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            name="search"
            id="search"
            onChange={e => setFilterText(e.target.value)}
            placeholder="Search fines"
          />
          <input
            type="checkbox"
            name="unpaid"
            id="unpaid"
            onChange={e => setUnpaidOnly(e.target.checked)}
          />
          <label htmlFor="unpaid">Unpaid</label>
        </form>
        <Link to="/fine/add">Add fine</Link>
      </div>
      <FinesTable fines={filteredFines} />
    </>
  );
};

export default Fines;
