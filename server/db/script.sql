CREATE TABLE inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, 
    description TEXT,
    quantity INTEGER
);


CREATE TABLE people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, 
    email TEXT NOT NULL, 
    location TEXT
);


CREATE TABLE donator (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL, 
    FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (item_id) REFERENCES inventory(id) ON DELETE CASCADE ON UPDATE CASCADE 
);


CREATE TABLE requester (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL, 
    FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (item_id) REFERENCES inventory(id) ON DELETE CASCADE ON UPDATE CASCADE -- Fixed table name
);

-- Insert sample data
INSERT INTO people (id, name, email, location) VALUES (1, 'test_user', 'gill.anisha@outlook.com', 'UBC');

-- Adder triggers
CREATE TRIGGER increment_inventory_quantity
AFTER INSERT ON donator
FOR EACH ROW
BEGIN
    UPDATE inventory
    SET quantity = quantity + NEW.quantity
    WHERE id = NEW.item_id;
END;

CREATE TRIGGER decrement_inventory_quantity
AFTER INSERT ON requester
FOR EACH ROW
BEGIN
    UPDATE inventory
    SET quantity = quantity - NEW.quantity
    WHERE id = NEW.item_id;
END;