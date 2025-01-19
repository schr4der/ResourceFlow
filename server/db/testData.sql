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

INSERT INTO inventory (name, description, quantity) VALUES 
  ('Bottled Water', 'sealed bottles of drinking water', 100),
  ('Canned Food', 'Assorted canned vegetables and proteins', 150),
  ('Sleeping Bags', 'Waterproof and insulated sleeping bags', 50),
  ('Tents', 'Two-person emergency tents', 30),
  ('First Aid Kits', 'Comprehensive first aid kits with bandages, antiseptics, and more', 40),
  ('Flashlights', 'Battery-powered flashlights', 70),
  ('Batteries', 'AA and AAA batteries for flashlights and radios', 200),
  ('Warm Mittens', 'Woolen mittens for cold weather', 80),
  ('Thermal Blankets', 'Compact and heat-retaining blankets', 60),
  ('Diapers', 'Packs of disposable baby diapers', 120),
  ('Toiletries', 'Personal hygiene kits with toothbrush, toothpaste, and soap', 90),
  ('Clothing', 'Assorted clothes for men, women, and children', 100),
  ('Shoes', 'Assorted sizes of durable walking shoes', 40),
  ('Power Banks', 'Portable chargers for phones and small devices', 25),
  ('Raincoats', 'Waterproof rain jackets for adults and children', 50),
  ('Face Masks', 'Disposable face masks for respiratory protection', 500),
  ('Gloves', 'Protective work gloves for clearing debris', 60),
  ('Cooking Supplies', 'Portable stoves and cooking utensils', 15),
  ('Sanitation Kits', 'Buckets and cleaning tools for hygiene maintenance', 30),
  ('Books & Toys', 'Items to comfort and distract children during crises', 40);

-- Insert Dummy Donator Data (5 donations)
-- Donators donate random quantities of items
INSERT INTO donator (person_id, item_id, quantity) VALUES
(1, 1, 10),  -- Alice donates 10 of Item 1
(2, 2, 15),  -- Bob donates 15 of Item 2
(3, 3, 20),  -- Charlie donates 20 of Item 3
(4, 4, 25),  -- David donates 25 of Item 4
(5, 5, 30);  -- Eve donates 30 of Item 5

INSERT INTO requester (person_id, item_id, quantity) VALUES
(6, 1, 5),   -- Frank requests 5 of Item 1 (same item as donated by Alice)
(7, 2, 10),  -- Grace requests 10 of Item 2 (same item as donated by Bob)
(8, 3, 15),  -- Hannah requests 15 of Item 3 (same item as donated by Charlie)
(9, 4, 20),  -- Ivy requests 20 of Item 4 (same item as donated by David)
(10, 5, 25);  -- Jack requests 25 of Item 5 (same item as donated by Eve)

INSERT INTO donator (person_id, item_id, quantity) VALUES
(6, 1, 5); -- Frank also donates 5 of Item 1, which matches the request

INSERT INTO requester (person_id, item_id, quantity) VALUES
(2, 4, 10),  -- Bob requests 10 of Item 4 (not donated yet)
(10, 2, 5);  -- Jack requests 5 of Item 2 (but Bob donated more than that)
