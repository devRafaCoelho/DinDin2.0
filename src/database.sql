CREATE DATABASE dindin

CREATE TABLE usuarios(
	id serial primary key,
  	nome text not null,
  	email varchar(100) not null unique,
  	senha text not null
);

CREATE TABLE categorias(
	id serial primary key,
  descricao text not null
);

CREATE TABLE transacoes(
	id serial primary key,
 	descricao text,
	valor numeric check(valor > 0) not null,
	data date default now(),
	categoria_id integer not null,
	usuario_id integer not null,
	tipo text not null,

  	FOREIGN KEY (categoria_id) references categorias(id),
  	FOREIGN KEY (usuario_id) references usuarios(id)
);

INSERT INTO categorias(descricao)
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
