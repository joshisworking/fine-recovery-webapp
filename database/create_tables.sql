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
  `userId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fines`.`SUBJECT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fines`.`SUBJECT` ;

CREATE TABLE IF NOT EXISTS `fines`.`SUBJECT` (
  `subjectId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `dob` CHAR(10) NOT NULL,
  PRIMARY KEY (`subjectId`),
  UNIQUE INDEX `subjectId_UNIQUE` (`subjectId` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fines`.`COURTHOUSE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fines`.`COURTHOUSE` ;

CREATE TABLE IF NOT EXISTS `fines`.`COURTHOUSE` (
  `courthouseId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `province` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`courthouseId`),
  UNIQUE INDEX `courthouseId_UNIQUE` (`courthouseId` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `ck_PROVINCE`
	CHECK (`province` in ('AB', 'BC', 'MB', 'NB', 'Nl', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT' )))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fines`.`FINE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fines`.`FINE` ;

CREATE TABLE IF NOT EXISTS `fines`.`FINE` (
  `fineId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(10,2) NOT NULL,
  `date` CHAR(10) NOT NULL,
  `courtFile` VARCHAR(20) NOT NULL,
  `courthouseId` INT UNSIGNED NOT NULL,
  `subjectId` INT UNSIGNED NOT NULL,
  `datePaid` CHAR(10) NULL,
  PRIMARY KEY (`fineId`),
  UNIQUE INDEX `fineId_UNIQUE` (`fineId` ASC) VISIBLE,
  INDEX `fk_FINE_COURTHOUSE_idx` (`courthouseId` ASC) VISIBLE,
  INDEX `fk_FINE_SUBJECT1_idx` (`subjectId` ASC) VISIBLE,
  CONSTRAINT `fk_FINE_COURTHOUSE`
    FOREIGN KEY (`courthouseId`)
    REFERENCES `fines`.`COURTHOUSE` (`courthouseId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FINE_SUBJECT1`
    FOREIGN KEY (`subjectId`)
    REFERENCES `fines`.`SUBJECT` (`subjectId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
