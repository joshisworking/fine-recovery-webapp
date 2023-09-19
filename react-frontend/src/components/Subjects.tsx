import React, { useEffect, useState } from 'react';
import { Subject } from '../interfaces/iSubject';
import { Link, useNavigate } from 'react-router-dom';

const Subjects: React.FC = () => {
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [filterText, setFilterText] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    document.title = 'Subjects';
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/subject')
      .then(response => response.json())
      .then(data => {
        setAllSubjects(data);
        setFilteredSubjects(data);
      })
      .catch(error => console.log('Error fetching data: ' + error));
  }, []);

  useEffect(() => {
    if (filterText.trim() === '') {
      // When the search text is empty, restore filteredSubjects to match allSubjects
      setFilteredSubjects(allSubjects);
    } else {
      // Otherwise, filter based on the search text and update filteredSubjects
      setFilteredSubjects(
        allSubjects.filter(
          sub =>
            sub.name.toLowerCase().includes(filterText.toLowerCase()) ||
            sub.dob.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    }
  }, [filterText, allSubjects]);

  return (
    <>
      <div className="heading-container">
        <h1 className="list-header">Subjects</h1>
        <form
          className="filter-form"
          onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            name="search"
            id="search"
            onChange={e => setFilterText(e.target.value)}
            placeholder="Search subjects"
          />
        </form>
        <Link to="/subject/add">Add subject</Link>
      </div>
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
            {filteredSubjects.map(subject => (
              <tr
                key={subject.subjectId}
                onClick={() => navigate(`/subject/${subject.subjectId}`)}
                className="table-row-clickable">
                <td>{subject.subjectId}</td>
                <td>{subject.name}</td>
                <td>{subject.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Subjects;
