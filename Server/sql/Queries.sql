
-- 1. All overdue fines, including the name of the subject and courthouse location:
SELECT `FINE`.`FineID`, `FINE`.`Amount`, `FINE`.`Date`, `FINE`.`CourtFile`,
       `COURTHOUSE`.`Name` AS `CourthouseName`, `COURTHOUSE`.`City`, `COURTHOUSE`.`Province`,
       `SUBJECT`.`Name` AS `SubjectName`
FROM `FINE`
LEFT JOIN `COURTHOUSE` ON `FINE`.`CourthouseID` = `COURTHOUSE`.`CourthouseID`
LEFT JOIN `SUBJECT` ON `FINE`.`SubjectID` = `SUBJECT`.`SubjectID`
WHERE 
  `FINE`.`Date` <= NOW() - INTERVAL 1 YEAR
  AND `FINE`.`DatePaid` IS NULL;


-- 2. All fines by courthouse, including the fine amount and subject ID and name:
SELECT `FINE`.`FineID`, `FINE`.`Amount`, `FINE`.`Date`, `FINE`.`CourtFile`,
       `COURTHOUSE`.`Name` AS `CourthouseName`, `COURTHOUSE`.`City`, `COURTHOUSE`.`Province`,
       `SUBJECT`.`SubjectID`, `SUBJECT`.`Name` AS `SubjectName`
FROM `FINE`
LEFT JOIN `COURTHOUSE` ON `FINE`.`CourthouseID` = `COURTHOUSE`.`CourthouseID`
LEFT JOIN `SUBJECT` ON `FINE`.`SubjectID` = `SUBJECT`.`SubjectID`
WHERE `COURTHOUSE`.`CourthouseID` = ?;


-- 3. All fines by subject, including the fine amount and courthouse city and ID:
SELECT `FINE`.`FineID`, `FINE`.`Amount`, `FINE`.`Date`, `FINE`.`CourtFile`,
       `COURTHOUSE`.`CourthouseID`, `COURTHOUSE`.`City`,
       `SUBJECT`.`Name` AS `SubjectName`
FROM `FINE`
LEFT JOIN `COURTHOUSE` ON `FINE`.`CourthouseID` = `COURTHOUSE`.`CourthouseID`
LEFT JOIN `SUBJECT` ON `FINE`.`SubjectID` = `SUBJECT`.`SubjectID`
WHERE `SUBJECT`.`SubjectID` = ?;