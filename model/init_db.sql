SET foreign_key_checks = 0;
DROP TABLE IF EXISTS repairs;

CREATE TABLE repairs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(250) NOT NULL,
    brand VARCHAR(250) NOT NULL,
    client_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

INSERT INTO repairs (model, brand, client_id)
VALUES
    ('iphone X', 'Apple', 1),
    ('Galaxy S22', 'Samsung', 2);


SET foreign_key_checks = 0;
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    phone INT NOT NULL
);

INSERT INTO clients (first_name, last_name, phone)
VALUES
    ('Sue', 'Andrews', 646357780),
    ('Alex', 'Sasov', 127893478),
    ('Alejandra', 'Ortiz', 123989347),
    ('Thom', 'Yorke', 234989238),
    ('Rafael', 'Pineda', 2398043),
    ('Luis', 'Alvarez', 98340020);