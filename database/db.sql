CREATE DATABASE ccontrolbd;

USE ccontrolbd;

--usuarios

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR (16) NOT NULL,
    password VARCHAR (60) NOT NULL,
    fullname VARCHAR (100) NOT NULL
);
ALTER TABLE users ADD PRIMARY KEY (id);

ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

--clientes

CREATE TABLE clientes (
    id INT(11) NOT NULL,
    nombre VARCHAR(9) NOT NULL,
    apellido VARCHAR(15) NOT NULL,
    cuit INT(11) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    departamento VARCHAR(20),
    codigo_postal INT(5),
    telefono INT(10),
    jubilado BOLEAN NOT NULL,
    fechaop DATE NOT NULL,
)