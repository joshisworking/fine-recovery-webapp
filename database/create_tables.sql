-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fines
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fines
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fines` DEFAULT CHARACTER SET utf8 ;
USE `fines` ;

-- -----------------------------------------------------
-- Table `fines`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fines`.`USER` ;

CREATE TABLE IF NOT EXISTS `fines`.`USER` (
  `UserId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE INDEX `UserId_UNIQUE` (`UserId` ASC) VISIBLE,
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fines`.`SUBJECT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fines`.`SUBJECT` ;

CREATE TABLE IF NOT EXISTS `fines`.`SUBJECT` (
  `SubjectId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NOT NULL,
  `DOB` CHAR(10) NOT NULL,
  PRIMARY KEY (`SubjectId`),
  UNIQUE INDEX `SubjectId_UNIQUE` (`SubjectId` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fines`.`COURTHOUSE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fines`.`COURTHOUSE` ;

CREATE TABLE IF NOT EXISTS `fines`.`COURTHOUSE` (
  `CourthouseId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `City` VARCHAR(100) NOT NULL,
  `Province` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`CourthouseId`),
  UNIQUE INDEX `CourthouseId_UNIQUE` (`CourthouseId` ASC) VISIBLE,
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE,
  CONSTRAINT `ck_PROVINCE`
	CHECK (`Province` in ('AB', 'BC', 'MB', 'NB', 'Nl', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT' )))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fines`.`FINE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fines`.`FINE` ;

CREATE TABLE IF NOT EXISTS `fines`.`FINE` (
  `FineId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Amount` DECIMAL(10,2) NOT NULL,
  `Date` CHAR(10) NOT NULL,
  `CourtFile` VARCHAR(20) NOT NULL,
  `CourthouseId` INT UNSIGNED NOT NULL,
  `SubjectId` INT UNSIGNED NOT NULL,
  `DatePaid` CHAR(10) NULL,
  PRIMARY KEY (`FineId`),
  UNIQUE INDEX `FineId_UNIQUE` (`FineId` ASC) VISIBLE,
  INDEX `fk_FINE_COURTHOUSE_idx` (`CourthouseId` ASC) VISIBLE,
  INDEX `fk_FINE_SUBJECT1_idx` (`SubjectId` ASC) VISIBLE,
  CONSTRAINT `fk_FINE_COURTHOUSE`
    FOREIGN KEY (`CourthouseId`)
    REFERENCES `fines`.`COURTHOUSE` (`CourthouseId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FINE_SUBJECT1`
    FOREIGN KEY (`SubjectId`)
    REFERENCES `fines`.`SUBJECT` (`SubjectId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
