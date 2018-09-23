INSERT INTO user(id, email, password, role, create_datetime, last_login_datetime)
VALUES (1, 'test@test.com', 'test', 'ADMIN', now(), now());

INSERT INTO user(id, email, password, role, create_datetime, last_login_datetime)
VALUES (2, 'test2@test.com', 'test', 'USER', now(), now());

INSERT INTO transaction(id, description, withdraw, deposit, transaction_datetime, create_datetime, user_id)
VALUES (1, 'My first expense', 100.00, null, now(), now(), 1);

INSERT INTO transaction(id, description, withdraw, deposit, transaction_datetime, create_datetime, user_id)
VALUES (2, 'My second expense', 100.00, null, now(), now(), 1);

INSERT INTO transaction(id, description, withdraw, deposit, transaction_datetime, create_datetime, user_id)
VALUES (3, 'My first expense', 100.00, null, now(), now(), 2);
