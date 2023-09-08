import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import setTitle from '../utils/setTitle';

export type Fine = {
  fineId?: number;
  amount: number;
  date: string;
  courtFile: string;
  courthouseId: number;
  courthouseName: string;
  subjectId?: number;
  subjectName?: string;
  datePaid: string | null;
};

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
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Fine ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Court File</th>
              <th>Courthouse</th>
              <th>Subject</th>
              <th>Date Paid</th>
            </tr>
          </thead>
          <tbody>
            {filteredFines.map(fine => (
              <tr key={fine.fineId}>
                <td>
                  <Link
                    className="table-edit-link"
                    to={'/fine/' + fine.fineId}>
                    Edit
                  </Link>
                  {fine.fineId}
                </td>
                <td>${fine.amount}</td>
                <td>{fine.date}</td>
                <td>{fine.courtFile}</td>
                <td>{fine.courthouseName}</td>
                <td>{fine.subjectName}</td>
                <td>{fine.datePaid || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Fines;
