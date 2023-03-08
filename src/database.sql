CREATE DATABASE dindin

CREATE TABLE usuarios(
	id serial primary key,
  	nome text not null,
  	email varchar(100) not null unique,
  	senha text not null
);
