import { useNavigate } from 'react-router-dom';
import { Courthouse } from './Courthouses';

type CourthousesTableProps = {
  courthouses: Courthouse[];
};

const CourthousesTable: React.FC<CourthousesTableProps> = ({ courthouses }) => {
  const navigate = useNavigate();
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
            <tr
              key={court.courthouseId}
              className="table-row-clickable"
              onClick={() => navigate(`/courthouse/${court.courthouseId}`)}>
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

export default CourthousesTable;
