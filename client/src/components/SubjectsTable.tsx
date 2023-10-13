import { useNavigate } from 'react-router-dom';
import { Subject } from '../interfaces/iSubject';

type SubjectTableProps = {
  subjects: Subject[];
};

const SubjectsTable: React.FC<SubjectTableProps> = ({ subjects }) => {
  const navigate = useNavigate();

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
  );
};

export default SubjectsTable;
