DROP TABLE IF EXISTS repairs;

CREATE TABLE repairs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL
);

INSERT INTO repairs (model, brand)
VALUES
    ('iphone X', 'Apple'),
    ('Galaxy S22', 'Samsung');


DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    mobile INT NOT NULL
);

INSERT INTO clients (first_name, last_name, mobile)
VALUES
    ('Sue', 'Andrews', 646357780),
    ('Alex', 'Sasov', 127893478),
    ('Alejandra', 'Ortiz', 123989347),
    ('Thom', 'Yorke', 234989238),
    ('Rafael', 'Pineda', 2398043),
    ('Luis', 'Alvarez', 98340020);