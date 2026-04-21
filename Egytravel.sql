-- Create Database
CREATE DATABASE IF NOT EXISTS egytravel_db;
USE egytravel_db;

-- USERS TABLE
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- TRIPS TABLE
CREATE TABLE trips (
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150),
    destination VARCHAR(100),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2),
    status ENUM('draft', 'active', 'completed') DEFAULT 'draft',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- BOOKINGS TABLE
CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    type ENUM('flight', 'hotel') NOT NULL,
    ref_code VARCHAR(100),
    price DECIMAL(10,2),
    booking_date DATE,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE
);

-- FEEDBACK TABLE
CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ADMINS TABLE
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'moderator') DEFAULT 'moderator'
);



INSERT INTO users (name, email, password, role)
VALUES ('Omar Mahmoud', 'omar@test.com', '123456', 'user'),
       ('Fares Eraky', 'fares@test.com', '123456', 'user');
       
       INSERT INTO trips (user_id, title, destination, start_date, end_date, budget, status)
VALUES (1, 'Cairo Adventure', 'Cairo', '2025-11-01', '2025-11-05', 1500.00, 'active'),
       (2, 'Luxor and Aswan Tour', 'Luxor', '2025-12-10', '2025-12-15', 2500.00, 'draft');

INSERT INTO bookings (trip_id, type, ref_code, price, booking_date)
VALUES (1, 'hotel', 'HTL001', 600.00, '2025-10-23'),
       (1, 'flight', 'FLT002', 900.00, '2025-10-24');


INSERT INTO feedback (trip_id, user_id, rating, comment)
VALUES (1, 1, 5, 'Amazing experience!'),
       (2, 2, 4, 'Great trip, but could be longer.');

SELECT t.trip_id, t.title, t.destination, u.name AS user_name
FROM trips t
JOIN users u ON t.user_id = u.user_id;


SELECT b.booking_id, b.type, b.price, t.title
FROM bookings b
JOIN trips t ON b.trip_id = t.trip_id
WHERE t.trip_id = 1;


SELECT f.comment, f.rating, u.name, t.title
FROM feedback f
JOIN users u ON f.user_id = u.user_id
JOIN trips t ON f.trip_id = t.trip_id;

INSERT INTO bookings (trip_id, type, ref_code, price, booking_date)
VALUES (99, 'hotel', 'HTL003', 400.00, '2025-10-24');


INSERT INTO users (name, email, password) VALUES ('Test', 'omar@test.com', '123');

CREATE USER 'omar'@'localhost' IDENTIFIED BY 'EGYTRAVEL!';
GRANT ALL PRIVILEGES ON egytravel_db.* TO 'omar'@'localhost';
FLUSH PRIVILEGES;