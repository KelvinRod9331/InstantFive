DROP DATABASE IF EXISTS instant5;
CREATE DATABASE instant5;

\c instant5;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR,
  email VARCHAR,
  full_name VARCHAR,
  profile_pic VARCHAR
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


INSERT INTO users (ID, username, password_digest, email, full_name, profile_pic) 
VALUES ('1','Kelstar809','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'kelstar809@instant.five', 'Kel Star', 'https://media.licdn.com/media/AAIAAgDGAAAAAQAAAAAAAAtfAAAAJDMyYjYwYzg3LWRmNjMtNGM3Mi05ODIwLTUxYzc3NzQxYmJkMw.jpg'),
('2','lala809','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'lala809@instant.five', 'Lala Land', ''),
('3','eioncont','$2a$10$LUQarA3IuQ4drG7dR16tDOsq9.SKIo9uCO9NwjH4Az4z0SruD1Zp6', '', '', ''),
('4','lev','$2a$10$fVXWijQhWpeF/Nm/3FCYb.MPz107f8MWlHbLrlPxyAKDYuse5iS4q', '', '', 'https://media.licdn.com/media/p/7/000/223/104/1ee2e97.jpg'),
('5','Zero','$2a$10$JFKsUWVbw3zj4XGq8KLL.OPLoX9qk3OH876EJzaXPi7ZaXSU6UG8S', 'emperor@in.five', 'Lelouch Vi Brittania', 'http://i.imgur.com/EPn8Zas.png'),
('6','Aang','$2a$10$9W5WEmwEPAfzSMqVgu/agOMHrvFfo7L2uufLz8NN34fy1KdgDO0Ai', 'avatar@in.five', 'Aang of Air Nomads', 'https://vignette.wikia.nocookie.net/dragonball/images/c/cc/Adult-aang-aang-31587811-290-290.jpg/revision/latest?cb=20130313023637');

INSERT INTO photos (ID, user_ID, url) 
VALUES ('1','1','https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/model/one-off/centenario/slider/centenario.jpg'),
 ('2','1','https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/share%20img/huracan-coupe-facebook-og.jpg'),
('3','2','https://cdn.vox-cdn.com/uploads/chorus_asset/file/9622635/lamborghini_terzo_millennio_7494.jpg'),
('4','5','http://www.darkmirage.com/blog/wp-content/uploads/2008/05/19_codegeass_ep07z.jpg'),
('5','5','https://s3.narvii.com/image/ldkqpnos6gnznrr3qssxviwbinciyhrt_hq.jpg'),
('6','5','https://ghostlightning.files.wordpress.com/2009/10/code-geass-r1-op-01-lelouch-zero-mask-removed.jpg?w=900'),
('7','5','https://warosu.org/data/cgl/img/0076/34/1403630149482.jpg'),
('8','5','https://wallpaperscraft.com/image/lelouch_lamperouge_code_geass_zero_102069_2560x1600.jpg'),
('9','5','https://img00.deviantart.net/33f0/i/2014/210/4/6/code_geass___zero_by_kxnom3-d7stal4.png'),
('10','6','https://orig00.deviantart.net/89f1/f/2008/076/5/c/aang_and_katara_by_kuro_theninthson.jpg'),
('11','6','https://vignette.wikia.nocookie.net/powerlisting/images/4/4a/ATLA_Aang.png/revision/latest?cb=20140510031327'),
('12','6','http://pm1.narvii.com/6222/366dbf8e322ce7b463e8bee8dc7be98c25c75d12_hq.jpg'),
('13','6','http://aidanmoher.com/blog/wp-content/uploads/2013/01/avatar-the-last-airbender-4efe016a180621-300x217.png'),
('14','6', 'https://vignette.wikia.nocookie.net/vsbattles/images/4/44/Tumblr_static_avatar_korra_render_by_supersleuth10-d596nug.png/revision/latest/scale-to-width-down/250?cb=20151017115555'),
('15','6', 'https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png');




INSERT INTO follows (user_id, follower_id) 
VALUES ('6','3'),
 ('6','2'),
('6','4'),
('2','3'),
('3','1'),
('3','2');
