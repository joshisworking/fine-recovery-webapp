import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import setTitle from '../utils/setTitle';

export type Fine = {
  fineId: number;
  amount: number;
  date: string;
  courtFile: string;
  courthouseId: number;
  courthouseName: string;
  subjectId: number;
  subjectName: string;
  datePaid: string | null;
};

const Fines: React.FC = () => {
  setTitle('Fines');
  const [fines, setFines] = useState<Fine[]>([]);

  // Obtain fine data
  useEffect(() => {
    fetch('http://localhost:5000/fine')
      .then(response => response.json())
      .then((data: { results: Fine[] }) => {
        setFines(data.results);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Fine ID</th>
            <th>amount</th>
            <th>Date</th>
            <th>Court File</th>
            <th>Courthouse</th>
            <th>Subject</th>
            <th>Date Paid</th>
          </tr>
        </thead>
        <tbody>
          {fines.map(fine => (
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
  );
};

export default Fines;
