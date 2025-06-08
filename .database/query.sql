CREATE TABLE users(id INTEGER PRIMARY KEY autoincrement, firstname TEXT NOT NULL, lastname TEXT NOT NULL, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);

-- INSERT INTO users(firstname, lastname, username, email, password) VALUES ("bbb", "bbb", "bbb", "b@gmail.com", "Bb@2bbbbbbbbbb");

-- SELECT * FROM extension;

CREATE TABLE comments(id INTEGER PRIMARY KEY autoincrement, comments TEXT NOT NULL);

-- DROP TABLE users;

-- ALTER TABLE users
-- DROP COLUMN email;