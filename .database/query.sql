CREATE TABLE users(id INTEGER PRIMARY KEY autoincrement, firstname TEXT NOT NULL, lastname TEXT NOT NULL, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);

-- INSERT INTO users(firstname, lastname, email, password) VALUES ("admin","password","01/01/1990");

-- SELECT * FROM extension;

CREATE TABLE comments(id INTEGER PRIMARY KEY autoincrement, comments TEXT NOT NULL);

-- DROP TABLE users;