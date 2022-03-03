SET foreign_key_checks = 0;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    userid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(10) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(50) NOT NULL
);

INSERT INTO `users` VALUES 
    (1,'user1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','user1@example.com'),
    (2,'user2','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6','user2@example.com'),
    (3,'user3','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy','user3@example.com');

DROP TABLE IF EXISTS repairs;
CREATE TABLE repairs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(250) NOT NULL,
    brand VARCHAR(250) NOT NULL,
    serial_number VARCHAR(250) NOT NULL,
    repair_status VARCHAR(250) NOT NULL,
    client_id INT NOT NULL,
    assignedto INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (assignedto) REFERENCES users(userid)
);

INSERT INTO repairs (model, brand, serial_number, repair_status, client_id, assignedto)
VALUES
    ('iPhone X', 'Apple', '0237BAD7JL8', 'Delivered', 1, 1),
    ('Galaxy S22', 'Samsung', '078583920HA', 'In progress', 2, 2);


SET foreign_key_checks = 0;
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    phone VARCHAR(250) NOT NULL
);

INSERT INTO clients (first_name, last_name, phone)
VALUES
    ('Sue', 'Andrews', 646357780),
    ('Alex', 'Sasov', 127893478),
    ('Alejandra', 'Ortiz', 123989347),
    ('Thom', 'Yorke', 234989238),
    ('Rafael', 'Pineda', 2398043),
    ('Luis', 'Alvarez', 98340020);