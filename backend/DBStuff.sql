DROP SCHEMA IF EXISTS `DB_UI`;

CREATE SCHEMA `DB_UI`;

USE DB_UI;

CREATE TABLE `Books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `IBSN` varchar(40) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Author` varchar(100) DEFAULT NULL,
  `bookCondition` varchar(45) NOT NULL,
  `bookFormat` varchar(45) NOT NULL,
  `Cost` decimal(5,2) NOT NULL,
  `Seller` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `book_id_UNIQUE` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO Books (IBSN, Title, Author, bookCondition, bookFormat, Cost, Seller) VALUES
 ('9780321993619','Calculus: Early Transcendentals','James Stewart','new','paperback', '10.99', 'cboeger@smu.edu'),
('9780135164147','Campbell Biology','Lisa A. Urry, Michael L. Cain, Steven A. Wasserman, Peter V. Minorsky, Rebecca B. Orr','new','paperback', '11.99', 'cmoore@smu.edu'),
('9780134639710','Psychology: From Inquiry to Understanding','Scott O. Lilienfeld, Steven J. Lynn, Laura L. Namy','new','paperback', '12.99', 'rlucas@smu.edu'),
('9781119375916','Operating System Concepts','Abraham Silberschatz, Greg Gagne, Peter B. Galvin','new','paperback', '11.99', 'abavare@smu.edu'),
('9780133760064','Introduction to Java Programming and Data Structures','Y. Daniel Liang','new','hardback', '19.99', 'test@gmail.com'),
('9780321836960','An Introduction to Statistical Learning','Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani','new','hardback', '18.99', 'musky@tesla.edu'),
('9781464182891','Macroeconomics','Paul Krugman, Robin Wells','lightly used','paperback','14.99', 'test2@gmail.com'),
('9780321629920','Essential University Physics','Richard Wolfson','new','ebook','8.99', 'user@example.com'),
('9781119049654','Fundamentals of Physics','David Halliday, Robert Resnick, Jearl Walker','significant wear','ebook','5.99', 'rlucas@smu.edu'),
('9780192853523','A Very Short Introduction to Philosophy','Edward Craig','sealed','hardback','59.99', 'cmoore@smu.edu'),
('9780140186883','1984','George Orwell','minor wear','hardback','49.99', 'cboeger@smu.edu'),
('9780143105947','The Adventures of Huckleberry Finn','Mark Twain','no back cover','paperback','6.99', 'abavare@smu.edu'),
('9780195119756','The Bible as in Literature','Leland Ryken','new','hardcover','12.89', 'test@gmail.com'),
('9780060935467','To Kill a Mockingbird','Harper Lee','like new','paperback','15.99', 'musky@tesla.edu'),
('9780141439518','Pride and Prejudice','Jane Austen','used','hardback','22.99', 'test2@gmail.com'),
('9780684830421','The Great Gatsby','F. Scott Fitzgerald','new','hardback','28.99', 'user@example.com'),
('9780142000083','Moby Dick','Herman Melville','worn','paperback','9.99', 'rlucas@smu.edu');




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






