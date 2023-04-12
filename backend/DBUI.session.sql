CREATE TABLE `newuser_db`.`newuser` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NULL,
    `last_name` VARCHAR(45) NULL,
    `email` VARCHAR(99) NULL,
    `password` VARCHAR(45) NULL,
    PRIMARY KEY (`id`)
);