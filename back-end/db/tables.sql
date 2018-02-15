DROP DATABASE IF EXISTS instant5;
CREATE DATABASE instant5;

\c instant5;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR,
  email VARCHAR,
  full_name VARCHAR
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


INSERT INTO users ( username, password_digest, email, full_name) 
VALUES ('Kelstar809','$2a$10$wvr2ElpmNw3rgKWKTF6V0OGhxR03JgW8a6O5QyewLrFeO4eN9dsTe', 'kelstar809@instant.five', 'Kel Star'),
('lala809','$2a$10$wvr2ElpmNw3rgKWKTF6V0OGhxR03JgW8a6O5QyewLrFeO4eN9dsTe', 'lala809@instant.five', 'Lala Land'),
('kelvin','$2a$10$wvr2ElpmNw3rgKWKTF6V0OGhxR03JgW8a6O5QyewLrFeO4eN9dsTe','fev@fgse.com','Kelvin');

INSERT INTO photos ( user_ID, url) 
VALUES ('1','https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/model/one-off/centenario/slider/centenario.jpg'),
 ('1','https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/share%20img/huracan-coupe-facebook-og.jpg'),
('3','https://cdn.vox-cdn.com/uploads/chorus_asset/file/9622635/lamborghini_terzo_millennio_7494.jpg'),
('3','https://s3.narvii.com/image/ldkqpnos6gnznrr3qssxviwbinciyhrt_hq.jpg'),
('3','https://warosu.org/data/cgl/img/0076/34/1403630149482.jpg');





INSERT INTO follows (user_id, follower_id) 
VALUES ('1','3'),
 ('1','2'),
('1','3'),
('2','3'),
('3','1'),
('3','2');
