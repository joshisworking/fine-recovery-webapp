-- User data
INSERT INTO `USER` (`Username`, `Email`)
VALUES
  ('JohnDoe', 'john.doe@example.com'),
  ('JaneSmith', 'jane.smith@example.com'),
  ('AlexBrown', 'alex.brown@example.com');


-- Courthouse data
INSERT INTO `COURTHOUSE` (`Name`, `City`, `Province`)
VALUES
  ('Justice Central Courthouse', 'Metropolis', 'ON'),
  ('Liberty District Courthouse', 'Freedomville', 'BC'),
  ('Harmony County Courthouse', 'Tranquility', 'AB'),
  ('Unity Municipal Courthouse', 'Harmonyville', 'QC'),
  ('Prosperity Circuit Courthouse', 'Prospect City', 'NS');


-- Subject data
INSERT INTO `SUBJECT` (`Name`, `DOB`)
VALUES
  ('Michael Johnson', '1990-05-15'),
  ('Emily Williams', '1988-12-10'),
  ('Daniel Lee', '1995-03-22'),
  ('Sophia Martin', '1982-09-05'),
  ('Ella Garcia', '1998-11-30'),
  ('William Anderson', '1987-08-12'),
  ('Olivia Thomas', '1993-02-28'),
  ('James Rodriguez', '1991-06-18'),
  ('Ava Hernandez', '1997-04-25'),
  ('Emma Perez', '1999-07-03'),
  ('Alexander Wilson', '1989-10-09'),
  ('Charlotte Turner', '1985-01-20'),
  ('Ethan Harris', '1996-12-07'),
  ('Isabella Martinez', '1994-08-02'),
  ('Mia Cooper', '1992-03-14');

    
-- 15 fines less than 1 year ago
INSERT INTO `FINE` (`Amount`, `Date`, `CourtFile`, `CourthouseId`, `SubjectId`)
VALUES
  (100.00, DATE_FORMAT(NOW() - INTERVAL 1 DAY, '%Y-%m-%d'), 'CF001', 1, 1),
  (200.00, DATE_FORMAT(NOW() - INTERVAL 3 DAY, '%Y-%m-%d'), 'CF002', 2, 2),
  (150.00, DATE_FORMAT(NOW() - INTERVAL 1 WEEK, '%Y-%m-%d'), 'CF003', 3, 3),
  (75.00, DATE_FORMAT(NOW() - INTERVAL 2 WEEK, '%Y-%m-%d'), 'CF004', 4, 4),
  (120.00, DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-%d'), 'CF005', 5, 5),
  (180.00, DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-%d'), 'CF006', 1, 6),
  (90.00, DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-%d'), 'CF007', 2, 7),
  (110.00, DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-%d'), 'CF008', 3, 8),
  (50.00, DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-%d'), 'CF009', 4, 9),
  (70.00, DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-%d'), 'CF010', 5, 10),
  (130.00, DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-%d'), 'CF011', 1, 11),
  (95.00, DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-%d'), 'CF012', 2, 12),
  (85.00, DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-%d'), 'CF013', 3, 13),
  (115.00, DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-%d'), 'CF014', 4, 14),
  (55.00, DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-%d'), 'CF015', 5, 15);

-- 15 fines more than 1 year ago
INSERT INTO `FINE` (`Amount`, `Date`, `CourtFile`, `CourthouseId`, `SubjectId`)
VALUES
  (210.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 1 DAY, '%Y-%m-%d'), 'CF016', 1, 1),
  (240.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 3 DAY, '%Y-%m-%d'), 'CF017', 2, 2),
  (185.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 1 WEEK, '%Y-%m-%d'), 'CF018', 3, 3),
  (175.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 2 WEEK, '%Y-%m-%d'), 'CF019', 4, 4),
  (270.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 1 MONTH, '%Y-%m-%d'), 'CF020', 5, 5),
  (220.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 2 MONTH, '%Y-%m-%d'), 'CF021', 1, 6),
  (250.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 3 MONTH, '%Y-%m-%d'), 'CF022', 2, 7),
  (200.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 4 MONTH, '%Y-%m-%d'), 'CF023', 3, 8),
  (195.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 5 MONTH, '%Y-%m-%d'), 'CF024', 4, 9),
  (180.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 6 MONTH, '%Y-%m-%d'), 'CF025', 5, 10),
  (260.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 7 MONTH, '%Y-%m-%d'), 'CF026', 1, 11),
  (225.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 8 MONTH, '%Y-%m-%d'), 'CF027', 2, 12),
  (290.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 9 MONTH, '%Y-%m-%d'), 'CF028', 3, 13),
  (240.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 10 MONTH, '%Y-%m-%d'), 'CF029', 4, 14),
  (205.00, DATE_FORMAT(NOW() - INTERVAL 1 YEAR - INTERVAL 11 MONTH, '%Y-%m-%d'), 'CF030', 5, 15);

