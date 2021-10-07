INSERT INTO departments (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");


INSERT INTO roles (title,salary,department_id)
VALUES  ("Salesperson", 50000, 1),
        ("Engineer", 100000, 2),
        ("Software Engineer", 110000, 2),
        ("CPA", 70000, 3),
        ("Lawyer", 250000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Ron","Swanson", 1, null),
        ("Lonnie","Johnson", 2,1),
        ("Gigz","Diaz", 3, 2),
        ("Sarah","Black", 4, 3);