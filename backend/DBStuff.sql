
CREATE SCHEMA `DB_UI`;

USE DB_UI;

CREATE TABLE `Books` (
  `IBSN` varchar(40) NOT NULL,
  `Title` varchar(45) NOT NULL,
  `Author` varchar(45) DEFAULT NULL,
  `bookCondition` varchar(45) NOT NULL,
  `bookFormat` varchar(45) NOT NULL,
  `Cost` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`IBSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `Users` (
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `createPass` varchar(45) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `Email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

