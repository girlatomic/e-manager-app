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
    last_name VARCHAR(100) NOT NULL
);

INSERT INTO clients (first_name, last_name)
VALUES
    ('Sue', 'Andrews'),
    ('Alex', 'Sasov'),
    ('Alejandra', 'Ortiz'),
    ('Thom', 'Yorke'),
    ('Rafael', 'Pineda'),
    ('Luis', 'Alvarez');