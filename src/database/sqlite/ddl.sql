CREATE TABLE User (
  id varchar(50) PRIMARY KEY,
  email varchar(100) UNIQUE NOT NULL,
  name varchar(100) NOT NULL,
  creationDate Date
)

CREATE TABLE Post (
  id varchar(50) PRIMARY KEY,
  title varchar(500),
  description TEXT,
  userId varchar(50) NOT NULL,
  creationDate Date
)

CREATE TABLE Comment (
  id varchar(50) PRIMARY KEY,
  text varchar(500),
  creationDate Date,
  postId varchar(50) NOT NULL,
  userId varchar(50) NOT NULL
)