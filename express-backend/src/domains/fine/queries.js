const fines = `
  SELECT 
    FINE.FineId,  
    FINE.Amount,
    FINE.Date,
    FINE.CourtFile,
    COURTHOUSE.Name as CourthouseName,
    SUBJECT.Name as SubjectName,
    FINE.DatePaid
  FROM FINE
  LEFT JOIN COURTHOUSE
    ON Fine.CourthouseId = COURTHOUSE.CourthouseId
  LEFT JOIN SUBJECT 
    ON FINE.SubjectID = SUBJECT.SubjectID
  ;`;

const fineById = 'SELECT * FROM FINE WHERE FineID = ?;';

const addFine = `
  INSERT INTO FINE (Amount, Date, CourtFile, CourthouseID, SubjectID)
  VALUES (?, ?, ?, ?, ?);
`;

const updateFine = `
  UPDATE FINE SET 
    Amount = ?,
    Date = ?,
    CourtFile = ?,
    CourthouseId = ?,
    SubjectId = ?,
    DatePaid = ?
  WHERE FineId = ?;
`;

const deleteFine = 'DELETE FROM FINE WHERE FineId = ?;';

const finesBySubjectId = `
  SELECT FINE.FineID, FINE.Amount, FINE.Date, FINE.CourtFile,
    COURTHOUSE.CourthouseID, COURTHOUSE.City,
    SUBJECT.Name AS SubjectName
  FROM FINE
  LEFT JOIN COURTHOUSE ON FINE.CourthouseID = COURTHOUSE.CourthouseID
  LEFT JOIN SUBJECT ON FINE.SubjectID = SUBJECT.SubjectID
  WHERE SUBJECT.SubjectID = ?;
`;

const finesByCourthouseId = `
  SELECT FINE.FineID, FINE.Amount, FINE.Date, FINE.CourtFile,
    COURTHOUSE.Name AS CourthouseName, COURTHOUSE.City, COURTHOUSE.Province,
    SUBJECT.SubjectID, SUBJECT.Name AS SubjectName
  FROM FINE
  LEFT JOIN COURTHOUSE ON FINE.CourthouseID = COURTHOUSE.CourthouseID
  LEFT JOIN SUBJECT ON FINE.SubjectID = SUBJECT.SubjectID
  WHERE COURTHOUSE.CourthouseID = ?;
`;

const finesOverdue = `
  SELECT FINE.FineID, FINE.Amount, FINE.Date, FINE.CourtFile,
        COURTHOUSE.Name AS CourthouseName, COURTHOUSE.City, COURTHOUSE.Province,
        SUBJECT.Name AS SubjectName
  FROM FINE
  LEFT JOIN COURTHOUSE ON FINE.CourthouseID = COURTHOUSE.CourthouseID
  LEFT JOIN SUBJECT ON FINE.SubjectID = SUBJECT.SubjectID
  WHERE 
    FINE.Date <= NOW() - INTERVAL 1 YEAR
    AND FINE.DatePaid IS NULL;
`;

module.exports = {
  fines,
  fineById,
  finesByCourthouseId,
  finesBySubjectId,
  finesOverdue,
  updateFine,
  deleteFine,
  addFine,
};
