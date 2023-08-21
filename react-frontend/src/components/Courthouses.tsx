import React, { useEffect, useState } from 'react';

export type Courthouse = {
  courthouseId: number;
  name: string;
  city: string;
  province: string;
};

const Courthouses: React.FC = () => {
  const [courthouses, setCourthouses] = useState<Courthouse[]>([]);

  useEffect(() => {
    document.title = 'Courthouses';
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/courthouse')
      .then(response => response.json())
      .then(data => {
        setCourthouses(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Courthouse ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Province</th>
          </tr>
        </thead>
        <tbody>
          {courthouses.map(court => (
            <tr key={court.courthouseId}>
              <td>{court.courthouseId}</td>
              <td>{court.name}</td>
              <td>{court.city}</td>
              <td>{court.province}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courthouses;
