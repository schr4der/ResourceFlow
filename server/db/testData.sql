-- Insert Dummy People (10 people)
INSERT INTO people (name, email, location) VALUES 
('Alice', 'alice@example.com', 'New York'),
('Bob', 'bob@example.com', 'Los Angeles'),
('Charlie', 'charlie@example.com', 'Chicago'),
('David', 'david@example.com', 'San Francisco'),
('Eve', 'eve@example.com', 'Miami'),
('Frank', 'frank@example.com', 'Dallas'),
('Grace', 'grace@example.com', 'Houston'),
('Hannah', 'hannah@example.com', 'Boston'),
('Ivy', 'ivy@example.com', 'Seattle'),
('Jack', 'jack@example.com', 'Denver');

-- Insert Dummy Inventory (5 items)
INSERT INTO inventory (name, description, quantity) VALUES
('Item 1', 'Description of Item 1', 50),
('Item 2', 'Description of Item 2', 60),
('Item 3', 'Description of Item 3', 70),
('Item 4', 'Description of Item 4', 80),
('Item 5', 'Description of Item 5', 90);

-- Insert Dummy Donator Data (5 donations)
-- Donators donate random quantities of items
INSERT INTO donator (person_id, item_id, quantity) VALUES
(1, 1, 10),  -- Alice donates 10 of Item 1
(2, 2, 15),  -- Bob donates 15 of Item 2
(3, 3, 20),  -- Charlie donates 20 of Item 3
(4, 4, 25),  -- David donates 25 of Item 4
(5, 5, 30);  -- Eve donates 30 of Item 5

-- Insert Dummy Requester Data (5 requests)
-- Requesters request random quantities of items, some match donations, others don't
INSERT INTO requester (person_id, item_id, quantity) VALUES
(6, 1, 5),   -- Frank requests 5 of Item 1 (same item as donated by Alice)
(7, 2, 10),  -- Grace requests 10 of Item 2 (same item as donated by Bob)
(8, 3, 15),  -- Hannah requests 15 of Item 3 (same item as donated by Charlie)
(9, 4, 20),  -- Ivy requests 20 of Item 4 (same item as donated by David)
(10, 5, 25);  -- Jack requests 25 of Item 5 (same item as donated by Eve)

-- Insert some requests and donations that don't match
-- Bob donates Item 2 (15), but Jack requests Item 4
-- Charlie donates Item 3 (20), but Eve requests Item 1
-- Frank requests more of Item 5 than Eve donated.
INSERT INTO donator (person_id, item_id, quantity) VALUES
(6, 1, 5); -- Frank also donates 5 of Item 1, which matches the request

-- Now let's add some more requesters and donators that won't match
INSERT INTO requester (person_id, item_id, quantity) VALUES
(2, 4, 10),  -- Bob requests 10 of Item 4 (not donated yet)
(10, 2, 5);  -- Jack requests 5 of Item 2 (but Bob donated more than that)
