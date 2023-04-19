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
  `Seller` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`IBSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO Books (IBSN, Title, Author, bookCondition, bookFormat, Cost, Seller) VALUES
  ('19283756','The Adventures of Duck and Goose','Sir Quackalot','new','paperback', '10.99', 'cboeger@smu.edu'),
  ('19382681','The Return of Duck and Goose','Sir Quackalot','new','paperback', '11.99', 'cmoore@smu.edu'),
  ('17984726','More Fun with Duck and Goose','Sir Quackalot','new','paperback', '12.99', 'rlucas@smu.edu'),
  ('16859372','Duck and Goose on Holiday','Sir Quackalot','new','paperback', '11.99', 'abavare@smu.edu'),
  ('16431663','The Return of Duck and Goose','Sir Quackalot','new','hardback', '19.99', 'test@gmail.com'),
  ('87564632','The Adventures of Duck and Goose','Sir Quackalot','new','hardback', '18.99', 'musky@tesla.edu'),
  ('74653354','My Friend is a Duck', 'A. Parrot','lightly used','paperback','14.99', 'test2@gmail.com'),
  ('16273864','Annotated Notes on the ‘Duck and Goose’ chronicles','Prof Macaw','new','ebook','8.99', 'user@example.com'),
  ('42654331','‘Duck and Goose’ Cheat Sheet for Students','Polly Parrot','significant wear','ebook','5.99', 'rlucas@smu.edu'),
  ('37129084','‘Duck and Goose’: an allegory for modern times?','Bor Ing','sealed','hardback','59.99', 'cmoore@smu.edu'),
  ('31231984','1984','George Orwell','minor wear','hardback','49.99', 'cboeger@smu.edu'),
  ('45798322','The Adventures of Huckleberry Finn','Tom Sawyer','no back cover','paperback','6.99', 'abavare@smu.edu'),
  ('42141211','The Bible as in Literature','Christian','new','hardcover','12.89', 'test@gmail.com'),
  ('58263419','To Kill a Mockingbird','Harper Lee','like new','paperback','15.99', 'musky@tesla.edu'),
  ('73461825','Pride and Prejudice','Jane Austen','used','hardback','22.99', 'test2@gmail.com'),
  ('98654231','The Great Gatsby','F. Scott Fitzgerald','new','hardback','28.99', 'user@example.com'),
  ('73518462','Moby Dick','Herman Melville','worn','paperback','9.99', 'rlucas');



CREATE TABLE `Users` (
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `createPass` varchar(45) NOT NULL,
  `privileges` varchar(45) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `Email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO Users (firstName, lastName, email, createPass, privileges) VALUES
  ('Clark','Boeger','cboeger@smu.edu','password', 'Admin'),
  ('Charles','Moore','cmoore@smu.edu','password', 'Admin'),
  ('Rudy','Lucas','rlucas@smu.edu','password', 'Admin'),
  ('Akul','Bavare','abavare@smu.edu','password', 'Student'),
  ('Test','User','test@gmail.com','password', 'Admin'),
  ('Elon','Musk','musky@tesla.edu','password', 'Admin'),
  ('Quick','Test','test','pass', 'Student'),
  ('Jane','Doe','test2@gmail.com','password', 'Student'),
  ('John','Smith','user@example.com','password', 'Student');

