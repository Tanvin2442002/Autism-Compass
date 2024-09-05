--Product Table--
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_01', 'Nike Shoe', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 2000, 10, 'Nike Shoes for Kid> one of the best one out there!');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_02', 'Unicorn Fantasy Puzzle Mat', 'https://img.freepik.com/free-photo/3d-mythical-unicorn-made-from-interlocking-children-s-toys_23-2150813934.jpg?t=st=1724654875~exp=1724658475~hmac=ce67b319df40fcea8449d73cf563436fc521b0bf5f820f4f8b3a51eda45cbead&w=740', 200, 10, ' A colorful and fun puzzle mat with a unicorn theme, ideal for creative play.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_03', 'Woodland Adventure Toy Tractor', 'https://img.freepik.com/premium-photo/charming-wooden-tractor-toy-perfect-kids-collectors_976564-12467.jpg?w=740', 20, 10, 'A classic wooden tractor, perfect for imaginative play and building motor skills.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_04', 'Calm Buddy Plush Toy', 'https://img.freepik.com/premium-photo/toy-with-toy-rabbit-it_1274269-77427.jpg?w=500', 100, 10, 'A soft and comforting plush toy designed to help relieve anxiety and stress in children.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_05', 'Toddler Building Blocks Tower', 'https://img.freepik.com/premium-photo/child-playing-with-blocks-made-by-building-made-by-legos-isolated-white-background_758367-194880.jpg?w=740', 150, 10, 'Stackable building blocks that help develop motor skills and creativity in toddlers.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_06', 'Sensory Ball Pack', 'https://www.autism-products.com/wp-content/uploads/Sensory-Ball-Pack.jpg', 110, 10, ' A set of sensory balls designed to engage and stimulate a child’s senses through play.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_07', 'Happy Safari Ride-On Car', 'https://img.freepik.com/premium-photo/toy-car-with-bird-top-word-word-side_1022901-78024.jpg?w=1000', 160, 10, 'A vibrant, safari-themed ride-on car that encourages imaginative play and motor skills development.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_08', 'Colorful Fantasy Puzzle Set', 'https://img.freepik.com/premium-photo/colorful-3d-illustration-with-moon-rainbow-game-elements_7023-496681.jpg?w=740', 120, 10, 'A whimsical puzzle set featuring vibrant colors and shapes, perfect for creative young minds.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_09', 'Clever Cube Stacker', 'https://img.freepik.com/premium-psd/colorful-stack-toys-with-purple-top_1037171-74656.jpg?w=740', 190, 10, 'A stackable cube toy designed to enhance problem-solving and fine motor skills in toddlers.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_10', 'Express Train Adventure', 'https://img.freepik.com/premium-photo/toy-train-with-cartoon-face-front-number-3-front_1143166-7694.jpg?w=740', 220, 10, 'A cheerful, colorful toy train that takes kids on endless imaginative journeys.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_11', 'Retro Racer Pedal Car', 'https://img.freepik.com/premium-photo/kids-car-toy-white-background_862994-503734.jpg?w=740', 190, 10, 'A classic pedal car with a sleek design, perfect for little drivers to explore and play.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_12', 'Pastel Playtime Shape Sorte', 'https://img.freepik.com/premium-photo/table-with-table-with-toy-it-toy-wall-it_1122641-16392.jpg?w=740', 140, 10, 'A pastel-colored shape sorter that helps develop recognition skills and hand-eye coordination.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_13', 'Dino Building Blocks Set', 'https://img.freepik.com/premium-photo/pile-toys-including-lego-house-dinosaur_979520-74355.jpg?w=1060', 100, 10, ' A fun and colorful dinosaur-themed building block set that sparks creativity and imagination in children.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_14', 'Teddy Backpack Bundle', 'https://img.freepik.com/premium-photo/children-school-bag-pack-with-toys_1304645-12242.jpg?w=900', 170, 10, ' A cozy backpack filled with adorable teddy bears, perfect for little adventurers on the go.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_15', 'My First Learning Phone', 'https://img.freepik.com/premium-photo/childs-toy-with-toy-phone-toy-car_1189726-7020.jpg?w=740', 165, 10, 'An interactive toy phone designed to introduce young children to numbers, colors, and shapes through play.');
INSERT INTO PRODUCT (PR_ID, NAME, SRC, PRICE, QUANTITY, DESCRIPTION) VALUES ('P_16', 'Space Explorer Playset', 'https://img.freepik.com/premium-photo/collection-vintage-toys-each-one-portal-nostalgic-memories-carefree-days-filled-with-e_1176614-22199.jpg?w=740', 210, 10, 'A thrilling space-themed playset filled with rockets, astronauts, and space vehicles to inspire cosmic adventures.');
--END OF PRODUCT TABLES--


INSERT INTO DELIVERY (
    D_ID,
    NAME,
    CITY,
    STREET,
    HOUSE_NO,
    CONTANCT_NO
) VALUES (
    'D_01',
    'Arif Abdullah',
    'Dhaka',
    'Kalshi',
    '274/A',
    '01721171112'
);

COMMIT;