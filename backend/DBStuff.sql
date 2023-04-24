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
  `Rating` DECIMAL(3, 2) NOT NULL DEFAULT 0,
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

  CREATE TABLE seller_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seller_email VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DELIMITER $$
CREATE TRIGGER update_user_rating
AFTER INSERT ON seller_reviews
FOR EACH ROW
BEGIN
  DECLARE total_rating DECIMAL(5, 2);
  DECLARE total_reviews INT;

  SELECT SUM(rating), COUNT(*)
  INTO total_rating, total_reviews
  FROM seller_reviews
  WHERE seller_email = NEW.seller_email;

  UPDATE Users
  SET Rating = total_rating / total_reviews
  WHERE email = NEW.seller_email;
END$$
DELIMITER ;


INSERT INTO seller_reviews (seller_email, rating, title, comment) VALUES
  ('cboeger@smu.edu', 5, 'Great seller!', 'Fast shipping and excellent communication.'),
  ('cboeger@smu.edu', 4, 'Good experience', 'The book was as described.'),
  ('cmoore@smu.edu', 3, 'Average seller', 'Shipping took longer than expected.'),
  ('cmoore@smu.edu', 4, 'Satisfied', 'Book in good condition.'),
  ('rlucas@smu.edu', 2, 'Not happy', 'The book was damaged.'),
  ('rlucas@smu.edu', 4, 'Good seller', 'Book arrived on time and well-packaged.'),
  ('abavare@smu.edu', 5, 'Excellent!', 'Very smooth transaction.'),
  ('abavare@smu.edu', 4, 'Good overall', 'Book was in decent condition.'),
  ('test@gmail.com', 1, 'Bad experience', 'Book never arrived.'),
  ('test@gmail.com', 3, 'Okay seller', 'Communication could be better.'),
  ('musky@tesla.edu', 5, 'Fantastic seller!', 'Would buy from again.'),
  ('musky@tesla.edu', 4, 'Good service', 'Book was as advertised.'),
  ('test', 2, 'Not recommended', 'Book was in poor condition.'),
  ('test', 3, 'Average experience', 'Nothing special.'),
  ('test2@gmail.com', 5, 'Great transaction', 'Fast shipping and good communication.'),
  ('test2@gmail.com', 4, 'Satisfied customer', 'Book as described.'),
  ('user@example.com', 2, 'Disappointed', 'Shipping was slow and book was damaged.'),
  ('user@example.com', 3, 'Mediocre seller', 'Book was okay, but not great.');






