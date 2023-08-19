const fines = `
  SELECT 
    FINE.FineId,  
    FINE.Amount,
    FINE.Date,
    FINE.CourtFile,
    COURTHOUSE.CourthouseId,
    COURTHOUSE.Name as CourthouseName,
    SUBJECT.SubjectId,
    SUBJECT.Name as SubjectName,
    FINE.DatePaid
  FROM FINE
  LEFT JOIN COURTHOUSE
    ON Fine.CourthouseId = COURTHOUSE.CourthouseId
  LEFT JOIN SUBJECT 
    ON FINE.SubjectId = SUBJECT.SubjectId
  ;`;

const fineById = `
  SELECT
    FINE.FineId,  
    FINE.Amount,
    FINE.Date,
    FINE.CourtFile,
    COURTHOUSE.CourthouseId,
    COURTHOUSE.Name as CourthouseName,
    SUBJECT.SubjectId,
    SUBJECT.Name as SubjectName,
    FINE.DatePaid 
  FROM FINE
  LEFT JOIN COURTHOUSE
    ON Fine.CourthouseId = COURTHOUSE.CourthouseId
  LEFT JOIN SUBJECT 
    ON FINE.SubjectId = SUBJECT.SubjectId
  WHERE FINE.FineId = ?;
`;

const addFine = `
  INSERT INTO FINE (Amount, Date, CourtFile, CourthouseId, SubjectId)
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
  SELECT FINE.FineId, FINE.Amount, FINE.Date, FINE.CourtFile,
    COURTHOUSE.CourthouseId, COURTHOUSE.City,
    SUBJECT.Name AS SubjectName
  FROM FINE
  LEFT JOIN COURTHOUSE ON FINE.CourthouseId = COURTHOUSE.CourthouseId
  LEFT JOIN SUBJECT ON FINE.SubjectId = SUBJECT.SubjectId
  WHERE SUBJECT.SubjectId = ?;
`;

const finesByCourthouseId = `
  SELECT FINE.FineId, FINE.Amount, FINE.Date, FINE.CourtFile,
    COURTHOUSE.Name AS CourthouseName, COURTHOUSE.City, COURTHOUSE.Province,
    SUBJECT.SubjectId, SUBJECT.Name AS SubjectName
  FROM FINE
  LEFT JOIN COURTHOUSE ON FINE.CourthouseId = COURTHOUSE.CourthouseId
  LEFT JOIN SUBJECT ON FINE.SubjectId = SUBJECT.SubjectId
  WHERE COURTHOUSE.CourthouseId = ?;
`;

const finesOverdue = `
  SELECT FINE.FineId, FINE.Amount, FINE.Date, FINE.CourtFile,
        COURTHOUSE.Name AS CourthouseName, COURTHOUSE.City, COURTHOUSE.Province,
        SUBJECT.Name AS SubjectName
  FROM FINE
  LEFT JOIN COURTHOUSE ON FINE.CourthouseId = COURTHOUSE.CourthouseId
  LEFT JOIN SUBJECT ON FINE.SubjectId = SUBJECT.SubjectId
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
