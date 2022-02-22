CREATE TABLE repairs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(100),
    brand VARCHAR(100),
    client_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);
​
CREATE TABLE clients (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(100)
);

INSERT INTO repairs (model, brand) 
VALUES
    ('iPhone X', 'Apple'),  
    ('Galaxy S22', 'Samsung'); 
​
INSERT INTO clients (first_name, last_name, phone) 
VALUES 
    ('Sue', 'Andrews', 689678527),
    ('Luis', 'Alvarez', 31608187),
    ('Sam', 'Huston', 23849950),
    ('Maria', 'Sorgaard', 1239587),
    ('Ahmed', 'Omar', 19399273),
    ('Angelica', 'Busconi', 2399938);
