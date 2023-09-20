const fines = `
  SELECT
    FINE.fineId,  
    FINE.amount,
    FINE.date,
    FINE.courtFile,
    COURTHOUSE.courthouseId,
    COURTHOUSE.name as courthouseName,
    SUBJECT.subjectId,
    SUBJECT.name as subjectName,
    FINE.datePaid
  FROM FINE
  LEFT JOIN COURTHOUSE
    ON Fine.courthouseId = COURTHOUSE.courthouseId
  LEFT JOIN SUBJECT 
    ON FINE.subjectId = SUBJECT.subjectId
  ;`;

const fineById = `
  SELECT
    FINE.fineId,  
    FINE.amount,
    FINE.date,
    FINE.courtFile,
    COURTHOUSE.courthouseId,
    COURTHOUSE.name as courthouseName,
    SUBJECT.subjectId,
    SUBJECT.Name as subjectName,
    FINE.datePaid 
  FROM FINE
  LEFT JOIN COURTHOUSE
    ON Fine.courthouseId = COURTHOUSE.courthouseId
  LEFT JOIN SUBJECT 
    ON FINE.subjectId = SUBJECT.subjectId
  WHERE FINE.fineId = ?;
`;

const addFine = `
  INSERT INTO FINE (amount, Date, courtFile, courthouseId, subjectId)
  VALUES (?, ?, ?, ?, ?);
`;

const updateFine = `
  UPDATE FINE SET 
    amount = ?,
    date = ?,
    courtFile = ?,
    courthouseId = ?,
    subjectId = ?,
    DatePaid = ?
  WHERE fineId = ?;
`;

const deleteFine = 'DELETE FROM FINE WHERE fineId = ?;';

const finesBysubjectId = `
  SELECT 
    FINE.fineId, 
    FINE.amount, 
    FINE.date, 
    FINE.courtFile,
    COURTHOUSE.courthouseId, 
    COURTHOUSE.Name as courthouseName,
    COURTHOUSE.City,
    SUBJECT.Name AS subjectName
  FROM FINE
  LEFT JOIN COURTHOUSE ON FINE.courthouseId = COURTHOUSE.courthouseId
  LEFT JOIN SUBJECT ON FINE.subjectId = SUBJECT.subjectId
  WHERE SUBJECT.subjectId = ?;
`;

const finesBycourthouseId = `
  SELECT 
    FINE.fineId, 
    FINE.amount, 
    FINE.date, 
    FINE.courtFile,
    COURTHOUSE.name AS courthouseName, 
    COURTHOUSE.City, 
    COURTHOUSE.Province,
    SUBJECT.subjectId, 
    SUBJECT.Name AS subjectName
  FROM FINE
  LEFT JOIN COURTHOUSE ON FINE.courthouseId = COURTHOUSE.courthouseId
  LEFT JOIN SUBJECT ON FINE.subjectId = SUBJECT.subjectId
  WHERE COURTHOUSE.courthouseId = ?;
`;

const finesOverdue = `
  SELECT FINE.fineId, FINE.amount, FINE.date, FINE.courtFile,
        COURTHOUSE.name AS courthouseName, COURTHOUSE.city, COURTHOUSE.province,
        SUBJECT.Name AS subjectName
  FROM FINE
  LEFT JOIN COURTHOUSE ON FINE.courthouseId = COURTHOUSE.courthouseId
  LEFT JOIN SUBJECT ON FINE.subjectId = SUBJECT.subjectId
  WHERE 
    FINE.date <= NOW() - INTERVAL 1 YEAR
    AND FINE.datePaid IS NULL;
`;

module.exports = {
  fines,
  fineById,
  finesBycourthouseId,
  finesBysubjectId,
  finesOverdue,
  updateFine,
  deleteFine,
  addFine,
};
