DROP DATABASE IF EXISTS instant5;
CREATE DATABASE instant5;

\c instant5;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR
);

CREATE TABLE photos (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  url VARCHAR
);

CREATE TABLE follows (
  user_ID INTEGER REFERENCES users,
  follower_ID  INTEGER REFERENCES users
);

CREATE TABLE likes (
  user_ID INTEGER REFERENCES users,
  photo_ID  INTEGER REFERENCES photos
);


INSERT INTO users (ID, username, password_digest) 
VALUES ('1','Kelstar809','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq'),
('2','lala809','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq');

INSERT INTO photos (ID, username, url) 
VALUES ('1','kelvin','https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/model/one-off/centenario/slider/centenario.jpg');
 