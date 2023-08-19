import React, { useEffect, useState } from 'react';

type Subject = {
  SubjectId: number;
  Name: string;
  DOB: string;
};

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    document.title = 'Subjects';
  });

  useEffect(() => {
    fetch('http://localhost:5000/subject')
      .then(response => response.json())
      .then(data => {
        setSubjects(data);
      })
      .catch(error => console.log('Error fetching data: ' + error));
  });

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Name</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject.SubjectId}>
              <td>{subject.SubjectId}</td>
              <td>{subject.Name}</td>
              <td>{subject.DOB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subjects;
