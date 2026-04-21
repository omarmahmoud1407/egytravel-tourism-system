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
