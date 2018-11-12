INSERT INTO user(id, email, password, role, create_datetime, last_login_datetime)
VALUES
(1, 'test@test.com', '$2a$10$jmSLtwnLJtr16IrgIqOOge3Q7cc2pqkaYDwvfCHwOCz.oFSO6O4qy', 'ADMIN', now(), now()),
(2, 'test2@test.com', '$2a$10$jmSLtwnLJtr16IrgIqOOge3Q7cc2pqkaYDwvfCHwOCz.oFSO6O4qy', 'USER', now(), now());

INSERT INTO category(id, category_limit, create_datetime, name, parent_category_id, user_id)
VALUES 
(1, 200.00, now(), 'Transportation', null, 1),
(2, 400.00, now(), 'Food', null, 1),
(3, 130.00, now(), 'Entertainment', null, 1),
(4, 100.00, now(), 'Coffee', 2, 1),
(5, 50.00, now(), 'Pizza', 2, 1),
(6, null, now(), 'Income', null, 1),
(7, 200.00, now(), 'Education', null, 1),
(8, 1200.00, now(), 'Housing', null, 1),
(9, 350.00, now(), 'Utility', null, 1),
(10, 20.00, now(), 'Starbucks', 4, 1);

INSERT INTO transaction(id, description, withdraw, deposit, transaction_datetime, create_datetime, user_id, category_id)
VALUES 
(1, 'EZ Paycheck', null, 4321.12, '2018-01-14', now(), 1, 6),
(2, 'EZ Paycheck', null, 4321.12, '2018-01-30', now(), 1, 6),
(3, 'EZ Paycheck', null, 4321.12, '2018-02-13', now(), 1, 6),
(4, 'EZ Paycheck', null, 4321.12, '2018-02-28', now(), 1, 6),
(5, 'Dominos', 22.03, null, '2018-03-21', now(), 1, 5),
(6, 'McDonalds', 12.34, null, '2018-03-22', now(), 1, 2),
(7, 'Textbook', 78.54, null, '2018-01-03', now(), 1, 7),
(8, 'Fido', 50.50, null, '2018-05-15', now(), 1, 9),
(9, 'Fido', 50.50, null, '2018-06-15', now(), 1, 9),
(10, 'Fido', 50.50, null, '2018-07-15', now(), 1, 9),
(11, 'Fido', 50.50, null, '2018-08-15', now(), 1, 9),
(12, 'Fido', 50.50, null, '2018-09-15', now(), 1, 9),
(13, 'Blenz', 5.67, null, '2018-10-02', now(), 1, 4),
(14, 'Starbucks', 8.99, null, '2018-10-11', now(), 1, 4),
(15, 'Compass Card', 98.00, null, '2018-04-01', now(), 1, 1),
(16, 'Compass Card', 98.00, null, '2018-05-01', now(), 1, 1),
(17, 'Compass Card', 98.00, null, '2018-06-01', now(), 1, 1),
(18, 'Compass Card', 98.00, null, '2018-07-01', now(), 1, 1),
(19, 'Compass Card', 98.00, null, '2018-08-01', now(), 1, 1),
(20, 'Compass Card', 98.00, null, '2018-09-01', now(), 1, 1),
(21, 'Bowling', 21.23, null, now(), now(), 1, 3),
(22, 'Tim Horton', 2.34, null, now(), now(), 1, 2),
(23, 'Pizza Hut', 30.32, null, now(), now(), 1, 2),
(24, 'Pasta', 24.56, null, now(), now(), 1, 2),
(25, 'The Keg', 123.45, null, now(), now(), 1, 2),
(26, 'test', 123.45, null, now(), now(), 1, null);

INSERT INTO schedule
(id, user_id, category_id, description, deposit, withdraw, start_date, recurring_pattern, last_processed_date, next_recurring_date, create_datetime)
VALUES
(1, 1, 6, 'EZ Pay', 2500.00, null, '2018-01-01', 'BI_WEEKLY', null, '2018-01-15', now()),
(2, 1, 9, 'Mobile', null, 50.50, '2018-05-06', 'MONTHLY', '2018-10-06', '2018-11-06', now()),
(3, 1, 9, 'BC hydro', null, 80.12, '2017-01-15', 'BI_MONTHLY', '2018-09-15', '2018-11-15', now()),
(4, 1, null, 'Tax', null, 500.00, '2017-05-01', 'YEARLY', '2018-05-01', '2019-05-01', now()),
(5, 1, 2, 'Pizza', null, 20.00, '2015-05-06', 'WEEKLY', '2018-10-06', '2018-11-06', now()),
(6, 1, 9, 'MSP', null, 37.50, '2018-05-26', 'MONTHLY', '2018-09-26', '2018-10-26', now());
