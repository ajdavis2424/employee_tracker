INSERT INTO department (id, department_name)
VALUES  (001, "Sales & Management"),
        (002, "Engineering"),
        (003,"Finance"),
        (004,"Legal");


INSERT INTO roles (id,title,salary,department_id)
VALUES  (001, "Sales & Management", 500000, 001),
        (002, "Software Engineer", 110000, 002),
        (003, "CPA", 70000, 003),
        (004, "Lawyer", 250000, 004);

INSERT INTO employee (id,first_name, last_name, roles_id, manager_id)
VALUES  (001, "Johan","Sins", 001, null),
        (002, "Lonnie","Johnson", 002,001),
        (003, "Gigz","Diaz", 003, 001),
        (004, "Sarah","Black", 004, 001);