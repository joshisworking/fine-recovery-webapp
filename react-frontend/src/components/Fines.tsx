import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import setTitle from '../utils/setTitle';

export type Fine = {
  FineId: number;
  Amount: number;
  Date: string;
  CourtFile: string;
  CourthouseId: number;
  CourthouseName: string;
  SubjectId: number;
  SubjectName: string;
  DatePaid: string | null;
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
            <th>Amount</th>
            <th>Date</th>
            <th>Court File</th>
            <th>Courthouse</th>
            <th>Subject</th>
            <th>Date Paid</th>
          </tr>
        </thead>
        <tbody>
          {fines.map(fine => (
            <tr key={fine.FineId}>
              <td>
                <Link
                  className="table-edit-link"
                  to={'/fine/' + fine.FineId}>
                  Edit
                </Link>
                {fine.FineId}
              </td>
              <td>${fine.Amount}</td>
              <td>{fine.Date}</td>
              <td>{fine.CourtFile}</td>
              <td>{fine.CourthouseName}</td>
              <td>{fine.SubjectName}</td>
              <td>{fine.DatePaid || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fines;
