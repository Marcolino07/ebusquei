-- ABRE o BD para ser manipulado com comandos
CREATE DATABASE IF NOT EXISTS ebusquei;

USE ebusquei;

-- CRIAR TABELA USUARIO --------------------------------------
CREATE TABLE IF NOT EXISTS administrador
(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(80) NOT NULL,
    nivel int(1) NOT NULL,
    usuario varchar(100) UNIQUE,
    senha varchar(255) NOT NULL
)default charset = utf8mb4;


INSERT INTO administrador(nome, nivel, usuario, senha)
values
("Edson Teixeira", 1, "admin123", '11111111');


-- CRIAR TABELA USUARIO --------------------------------------
CREATE TABLE IF NOT EXISTS usuario
(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(30) NOT NULL,
    sobrenome varchar(80) NOT NULL,
    nascimento date,
    email varchar(100) UNIQUE,
    senha varchar(255) NOT NULL,
    verificado char(1) DEFAULT 0
)default charset = utf8mb4;


INSERT INTO usuario(nome, sobrenome, email, senha)
values
("Elvis", "Marcolino", "elvis@gmail.com", '11111111'),
("Leonardo", "Valéria", "leo@gmail.com", '11111111');


CREATE TABLE IF NOT EXISTS mercado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    cidade VARCHAR(30) NOT NULL
)default charset = utf8mb4;


CREATE TABLE IF NOT EXISTS produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    id_mercado INT NOT NULL,
    nome varchar(30) NOT NULL,
    marca varchar(30) NOT NULL,
    valor decimal(10,2) NOT NULL,
    data_cad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_mercado) REFERENCES mercado(id)
)default charset = utf8mb4;


CREATE TABLE IF NOT EXISTS lista (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    itens VARCHAR(45) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
)default charset = utf8mb4;


CREATE TABLE IF NOT EXISTS lista_produto (
    id_lista INT,
    id_produro INT,
    FOREIGN KEY (id_lista) REFERENCES lista(id),
    FOREIGN KEY (id_produto) REFERENCES produto(id)
)default charset = utf8mb4;


CREATE TABLE IF NOT EXISTS preco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    id_mercado INT NOT NULL,
    valor DECIMAL(10,2),
    data_atualizacao DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
)default charset = utf8mb4;

