CREATE TABLE users(id INTEGER PRIMARY KEY autoincrement, firstname TEXT NOT NULL, lastname TEXT NOT NULL, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);

-- INSERT INTO users(firstname, lastname, username, email, password) VALUES ("bbb", "bbb", "bbb", "b@gmail.com", "Bb@2bbbbbbbbbb");

-- SELECT * FROM extension;

-- CREATE TABLE comments(id INTEGER PRIMARY KEY autoincrement, comments TEXT NOT NULL);

CREATE TABLE feedback(id INTEGER PRIMARY KEY autoincrement, username TEXT NOT NULL, starRating INTEGER NOT NULL, comments TEXT NOT NULL);

-- DROP TABLE users;
-- DROP TABLE comments;
-- DROP TABLE feedback;

-- ALTER TABLE users
-- DROP COLUMN email;

<<<<<<< HEAD
CREATE TABLE uploadedPhotos(id INTEGER PRIMARY KEY autoincrement, name TEXT NOT NULL);
INSERT INTO uploadedPhotos (name) VALUES ("f3b3b08f4773ea17a6c075f99de09064");
=======
CREATE TABLE pages(aboutMeText TEXT, openingHoursText TEXT, ratioText TEXT, resumeText TEXT, welcomePageText TEXT);

INSERT INTO pages(aboutMeText, openingHoursText, ratioText, resumeText, welcomePageText) VALUES (
    "Hello Parents!<br><br>My name is Vicky, the primary educator of Vivid Hills Family Day Care. As a mother of two and an experienced early childhood educator, I have extensive experience in parenting and teaching.",
    "Monday to Friday<br><br>8:00AM to 6:00PM",
    "As a registered family day care educator, we strictly adhere to the Education and Care Services National Law and Regulations. This includes maintaining one educator for four preschool-aged children and three school-aged children.",
    "[].                     - ABN 67661762032                    - registered by Approved Service Baulkham Hills Family Day Care ABN 52853598050",
    "Vivid Hills is based in our warm and welcoming home in Baulkham Hills. <br><br>We are very eager to create a nurturing and engaging environment where children aged one to five years old are able to grow, learn and thrive."
);
>>>>>>> adminDB
