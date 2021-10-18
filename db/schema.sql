-- SQL commands and tables go here??
-- schema is the structure where we diagram out

DROP DATABASE IF EXISTS shellcompany_db;
CREATE DATABASE shellcompany_db;

USE shellcompany_db;

-- DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);


CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
	FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE SET NULL
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
