CREATE DATABASE IF NOT EXISTS WBAV5;
USE db_wbav5;

CREATE TABLE IF NOT EXISTS users(
id int(255) auto_increment not null,
name varchar(30),
lastNameF varchar(30),
lastNameM varchar(30),
pass varchar(255) not null,
email varchar(255),
career varchar(30),
role varchar(255),
createdAt timestamp,
updatedAt timestamp,
CONSTRAINT pk_users PRIMARY KEY(id) 
)ENGINE=InnoDb;			

CREATE TABLE IF NOT EXISTS profiles(
id int(255) auto_increment not null,
users_id int not null,
cel varchar(10),
description text,
estudy text,
academy varchar(255),
available tinyint,
place_at varchar(255),
dt_visible tinyint,
keyword1 varchar(255),
keyword2 varchar(255),
keyword3 varchar(255),
keyword4 varchar(255),
keyword5 varchar(255),
CONSTRAINT pk_profile PRIMARY KEY(id),
CONSTRAINT fk_profile_user FOREIGN KEY(users_id) REFERENCES users(id) 
)ENGINE=InnoDb;			


CREATE TABLE IF NOT EXISTS proyects(
id int(255) auto_increment not null,
user1_id int,
user2_id int,
user3_id int,
user4_id int,
userD_id int,
title varchar(255),
description text,
keyword varchar(255),
document varchar(255),
CONSTRAINT pk_proyects PRIMARY KEY(id),
CONSTRAINT fk_student1 FOREIGN KEY(user1_id) REFERENCES users(id),
CONSTRAINT fk_student2 FOREIGN KEY(user2_id) REFERENCES users(id),
CONSTRAINT fk_student3 FOREIGN KEY(user3_id) REFERENCES users(id),
CONSTRAINT fk_student4 FOREIGN KEY(user4_id) REFERENCES users(id),
CONSTRAINT fk_studentD FOREIGN KEY(userD_id) REFERENCES users(id)
)ENGINE=InnoDb;

CREATE TABLE IF NOT EXISTS validation(
id int(255) auto_increment not null,
email varchar(255),
code varchar(255),
CONSTRAINT pk_validation PRIMARY KEY(id)
)ENGINE=InnoDb;

INSERT INTO usuarios VALUES(NULL, 'Kevin', 'Ramirez', 'Ramirez', '1234', 'kevin@alumno.ipn.mx', 'Ingenieria en Computacion', CURTIME(), 'ROLE_ALUMNO');
INSERT INTO usuarios VALUES(NULL, 'Rocio', 'Alvarado', 'Zamora', '1234', 'rocio@ipn.mx', 'Ingenieria en Computacion', CURTIME(), 'ROLE_DOCENTE');
INSERT INTO usuarios VALUES(NULL, 'Ricardo', 'Sarmiento', 'Rosas', '1234', 'ricardo@ipn.mx', 'Ingenieria en Computacion', CURTIME(), 'ROLE_DOCENTE');

INSERT INTO proyectos VALUES(NULL, '1', NULL, NULL, NULL, '3', 'Proyecto 1', 'Descripcion 1', 'Robot Microcontrolador Arduino', NULL);







CREATE DATABASE IF NOT EXISTS WBAV5;
USE WBAV5;

CREATE TABLE IF NOT EXISTS users(
id int(255) auto_increment not null,
proyectId int,
name varchar(30),
lastNameF varchar(30),
lastNameM varchar(30),
pass varchar(255) not null,
email varchar(255),
career varchar(30),
role varchar(255),
createdAt timestamp,
updatedAt timestamp,
CONSTRAINT pk_users PRIMARY KEY(id),
CONSTRAINT fk_student FOREIGN KEY(proyectId) REFERENCES proyects(id),
)ENGINE=InnoDb;			

CREATE TABLE IF NOT EXISTS profiles(
id int(255) auto_increment not null,
userId int,
cel varchar(10),
picture varchar(255),
description text,
estudy text,
academy varchar(255),
available tinyint,
place_at varchar(255),
dt_visible tinyint,
keyword1 varchar(255),
keyword2 varchar(255),
keyword3 varchar(255),
keyword4 varchar(255),
keyword5 varchar(255),
createdAt timestamp,
updatedAt timestamp,
CONSTRAINT pk_profile PRIMARY KEY(id),
CONSTRAINT fk_profile_user FOREIGN KEY(userId) REFERENCES users(id) 
)ENGINE=InnoDb;			


CREATE TABLE IF NOT EXISTS proyects(
id int(255) auto_increment not null,
title varchar(255),
description text,
keyword varchar(255),
document varchar(255),
CONSTRAINT pk_proyects PRIMARY KEY(id),
)ENGINE=InnoDb;

CREATE TABLE IF NOT EXISTS validation(
id int(255) auto_increment not null,
email varchar(255),
code varchar(255),
CONSTRAINT pk_validation PRIMARY KEY(id)
)ENGINE=InnoDb;