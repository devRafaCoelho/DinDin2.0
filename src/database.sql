CREATE DATABASE dindin

CREATE TABLE users(
	id serial primary key,
  name text not null,
  email varchar(100) not null unique,
  password text not null
);

CREATE TABLE categories(
	id serial primary key,
  description text not null
);

CREATE TABLE transactions(
	id serial primary key,
 	description text,
	value numeric check(value > 0) not null,
	date date default now(),
	categorie_id integer not null,
	user_id integer not null,
	type text not null,

  FOREIGN KEY (categorie_id) references categories(id),
  FOREIGN KEY (user_id) references users(id)
);

INSERT INTO categories(description)
values

('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');
