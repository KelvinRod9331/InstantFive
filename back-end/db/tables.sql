DROP DATABASE IF EXISTS test;
CREATE DATABASE test;

\c test;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR
);

CREATE TABLE photos (
  ID SERIAL PRIMARY KEY,
  user_ID INTEGER REFERENCES users,
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
