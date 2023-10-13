import { Link, useNavigate } from 'react-router-dom';
import { Fine } from '../interfaces/iFine';

type FinesTableProps = {
  fines: Fine[];
};

const FinesTable: React.FC<FinesTableProps> = ({ fines }) => {
  const navigate = useNavigate();

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
            <tr
              key={fine.fineId}
              className="table-row-clickable"
              onClick={() => navigate(`/fine/${fine.fineId}`)}>
              <td>{fine.fineId}</td>
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

export default FinesTable;
