import React, { useEffect, useState } from 'react';
import { Subject } from '../interfaces/iSubject';
import { Link, useNavigate } from 'react-router-dom';
import SubjectsTable from './SubjectsTable';

const Subjects: React.FC = () => {
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [filterText, setFilterText] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    document.title = 'Subjects';
  });

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
      <SubjectsTable subjects={filteredSubjects} />
    </>
  );
};

export default Subjects;
