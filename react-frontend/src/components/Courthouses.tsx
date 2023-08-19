import React, { useEffect, useState } from 'react';

export type Courthouse = {
  CourthouseId: number;
  Name: string;
  City: string;
  Province: string;
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
            <tr key={court.CourthouseId}>
              <td>{court.CourthouseId}</td>
              <td>{court.Name}</td>
              <td>{court.City}</td>
              <td>{court.Province}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courthouses;
