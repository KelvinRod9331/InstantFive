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


INSERT INTO users (ID, username, password_digest) 
VALUES ('1','Kelstar809','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq'),
('2','lala809','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq'),
('3','eioncont','$2a$10$LUQarA3IuQ4drG7dR16tDOsq9.SKIo9uCO9NwjH4Az4z0SruD1Zp6'),
('4','lev','$2a$10$fVXWijQhWpeF/Nm/3FCYb.MPz107f8MWlHbLrlPxyAKDYuse5iS4q');

INSERT INTO photos (ID, user_ID, url) 
VALUES ('1','1','https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/model/one-off/centenario/slider/centenario.jpg'),
 ('2','1','https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/share%20img/huracan-coupe-facebook-og.jpg'),
('3','2','https://cdn.vox-cdn.com/uploads/chorus_asset/file/9622635/lamborghini_terzo_millennio_7494.jpg');

INSERT INTO follows (user_id, follower_id) 
VALUES ('1','4'),
 ('1','2'),
('1','3');