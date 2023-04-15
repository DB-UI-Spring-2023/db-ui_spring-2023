DROP SCHEMA IF EXISTS `DB_UI`;

CREATE SCHEMA `DB_UI`;

USE DB_UI;

CREATE TABLE `Books` (
  `IBSN` varchar(40) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Author` varchar(45) DEFAULT NULL,
  `bookCondition` varchar(45) NOT NULL,
  `bookFormat` varchar(45) NOT NULL,
  `Cost` decimal(5,2) NOT NULL,
  PRIMARY KEY (`IBSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO Books (IBSN, Title, Author, bookCondition, bookFormat, Cost) VALUES
  ('19283756','The Adventures of Duck and Goose','Sir Quackalot','new','paperback', '10.99'),
  ('19382681','The Return of Duck and Goose','Sir Quackalot','new','paperback', '11.99'),
  ('17984726','More Fun with Duck and Goose','Sir Quackalot','new','paperback', '12.99'),
  ('16859372','Duck and Goose on Holiday','Sir Quackalot','new','paperback', '11.99'),
  ('16431663','The Return of Duck and Goose','Sir Quackalot','new','hardback', '19.99'),
  ('87564632','The Adventures of Duck and Goose','Sir Quackalot','new','hardback', '18.99'),
  ('74653354','My Friend is a Duck', 'A. Parrot','lightly used','paperback','14.99'),
  ('16273864','Annotated Notes on the ‘Duck and Goose’ chronicles','Prof Macaw','new','ebook','8.99'),
  ('42654331','‘Duck and Goose’ Cheat Sheet for Students','Polly Parrot','significant wear','ebook','5.99'),
  ('37129084','‘Duck and Goose’: an allegory for modern times?','Bor Ing','sealed','hardback','59.99'),
  ('31231984','1984','George Orwell','minor wear','hardback','49.99'),
  ('45798322','The Adventures of Huckleberry Finn','Tom Sawyer','no back cover','paperback','6.99'),
  ('42141211','The Bible as in Literature','Christian','new','hardcover','12.89');


CREATE TABLE `Users` (
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `createPass` varchar(45) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `Email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO Users (firstName, lastName, email, createPass) VALUES
  ('Clark','Boeger','cboeger@smu.edu','password'),
  ('Charles','Moore','cmoore@smu.edu','password'),
  ('Rudy','Lucas','rlucas@smu.edu','password'),
  ('Akul','Bavare','abavare@smu.edu','password'),
  ('Test','User','test@gmail.com','password'),
  ('Elon','Musk','musky@tesla.edu','password'),
  ('Quick','Test','test','pass');