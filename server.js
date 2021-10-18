// npm init/inquirer(npm install inquirer) /express (npm i express)/mysql2 (npm install --save mysql2)
// Installed CONSOLE TABLE PACKAGE (this allosw me to print myql rows to console) --> npm install console.table --save  // bower install console.table --save

// MYSQL login -- mysql -u root -p
// MAKE DATABASE IN TERMINAL OR source schema.sql


//Import required libraries
const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const disp = require("console.table");

//Here we connect to the shellcompany_db database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'EMTschool1!',
    database: 'shellcompany_db'
  },
  console.log(`Connected to the shellcompany_db database.`)
);

function init() {
  mainMenuPrompt();
}
// function for the main prompt for the menu
const mainMenuPrompt = () => {
  inquirer
  .prompt([
      {
    type: "list",
    name: "mainMenu",
    message: "What Would You Like To Do?",
    choices: ["View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit"]
  }
  ])
  .then((userChoice) => {
    switch (userChoice.mainMenu) {
      case "View All Departments": viewAllDept();
        break;
      case "add an employee": addEmployee();
        break;
      case "update an employee role": updateEmpRole();
        break;
      case "View All Roles": viewAllRoles();
        break;
      case "add a role": addRole();
        break;
      case "View All Employees": viewAllEmployee();
        break;
      case "Add Department": addDept();
        break;
      case "Quit": db.end();
        break;
      default:
        console.log("ERROR! Please check your code");
        break;

    }
  })

}
// SQL Query/Function for viewing All Department
const viewAllDept = () => {
  db.query(`SELECT * FROM departments`, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
    mainMenuPrompt();
  });
}

// SQL Query/Function for viewing all roles
const viewAllRoles = () => {
  db.query(`SELECT A.id, A.title, A.salary, B.name AS Departments, A.department_id
            FROM roles AS A
            JOIN departments as B
            ON A.department_id = B.id `, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
    mainMenuPrompt();
  });
}

// SQL Query/Function for viewing all employees
const viewAllEmployee = () => {
  var sqlQuery = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS departments, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employees e
  LEFT JOIN roles r
	ON e.role_id = r.id
  LEFT JOIN departments d
  ON d.id = r.department_id
  LEFT JOIN employees m
	ON m.id = e.manager_id` ;

  db.query(sqlQuery, function (err, res) {
    if (err) {
      console.log(err);
    }
    console.table(res);
    mainMenuPrompt();
  });
}

//SQL Query/Function for adding a Department
const addDept = () => {
  inquirer
  .prompt([
      {
    type: "input",
    name: "dept",
    message: "Enter the Name of the department? "
  }
  ])
  .then((answer) => {
    let deptName = answer.dept;
    console.log(deptName);
    db.query(`INSERT INTO departments (name) VALUES ('${deptName}')`, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("DEPARTMENT Added sucessfully!!");
      mainMenuPrompt();
    })
  })

}

// SQL Query/Function for adding a role
const addRole = () => {
  var addRoleQuery =
    `SELECT id , name FROM departments`
  db.query(addRoleQuery, function (err, res) {
    if (err) {
      console.log('Error while fetching department data');
      return;
    }
    const empdept = [];
    for (let index = 0; index < res.length; index++) {
      empdept.push(res[index].name);

    }
    promptForAddingRole(empdept)
  })
}
function promptForAddingRole(empdept) {
  inquirer
  .prompt([
    {
      type: "input",
      name: "role",
      message: "Enter Name of the role?"
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary :?"
    },
    {
      type: "list",
      name: "dept",
      message: "Enter Name department ?",
      choices: empdept,
    },
  ])
  .then((answer) => {
    let newRole = answer.role;
    let newSalary = answer.salary;
    let dept = answer.dept;

    db.query(`SELECT ID FROM departments WHERE name = ('${answer.dept}')`, (err, result) => {
      if (err) {
        console.log(err);
      }
      const deptid = result[0].id;

      db.query(`INSERT INTO role (title,salary,department_id) VALUES ('${newRole}', '${newSalary}','${deptid}')`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("Row has been added!");
        mainMenuPrompt();
      })
    });
  })
}

//SQL Query/Function for adding an employee
const addEmployee = () => {

  var addEmployeeQuery = `SELECT department_id , title FROM role`
  db.query(addEmployeeQuery, function (err, res) {
    if (err) {
      console.log('Error while fetching role data');
      return;
    }
    var empRole = [];
    for (let index = 0; index < res.length; index++) {
      empRole.push(res[index].title);
    }
    var query2 = `SELECT  id , first_name, last_name FROM employee`
    db.query(query2, function (err, res) {
      if (err) {
        console.log('Error while fetching role data');
        return;
      }
      var empMngr = [];
      for (let index = 0; index < res.length; index++) {
        empMngr.push(res[index].first_name + ' ' + res[index].last_name);
      }
      promptForAddingEmployee(empRole, empMngr)

    });
  });
}

function promptForAddingEmployee(empRole, empMngr) {
  inquirer
  .prompt([
    {
      type: "input",
      name: "employeeFirstName",
      message: "What is the employee's first Name?"
    },
    {
      type: "input",
      name: "employeeLastName",
      message: "What is the employee's last Name?"
    },
    {
      type: "list",
      name: "employeeRole",
      message: "What is the employee's role?",
      choices: empRole,
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Who is the employee's Manager?",
      choices: empMngr,
    },

  ])
  .then((answers) => {

    let newEmpFName = answers.employeeFirstName;
    let newEmpLName = answers.employeeLastName;
    db.query(`SELECT id FROM role WHERE title = ('${answers.employeeRole}')`, (err, res) => {
      if (err) {
        console.log(err);
      }
      var newEmpRole_id = res[0].id;
      db.query(`SELECT id FROM employee WHERE concat(first_name, " ", last_name) = ('${answers.employeeManager}')`, (err, result) => {
        if (err) {
          console.log(err);
        }

        var newMgrRole_id = result[0].id;

        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newEmpFName}', '${newEmpLName}', '${newEmpRole_id}', '${newMgrRole_id}')`, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("ROW ADDED SUCCESSFULLY");
          mainMenuPrompt();
        })
      });
    });

  })

}
//Function for updating a role
const updateEmpRole = () => {

  var query1 = `SELECT first_name, last_name FROM employee`
  db.query(query1, function (err, res) {
    if (err) {
      console.log('Error while fetching  data');
      return;
    }
    var empName = [];
    for (let index = 0; index < res.length; index++) {
      empName.push(res[index].first_name + " " + res[index].last_name);
    }
    var query2 = `SELECT title FROM role`
    db.query(query2, function (err, result) {
      if (err) {
        console.log('Error while fetching role data');
        return;
      }
      var empRole = [];
      for (let index = 0; index < result.length; index++) {
        empRole.push(result[index].title);
      }
      promptForUpdatingEmployeeRole(empName, empRole);

    })

  })

}

function promptForUpdatingEmployeeRole(empName, empRole) {
  inquirer.prompt([
    {
      type: "list",
      name: "employeeName",
      message: "Which employee do you want to change the role? ",
      choices: empName,
    },
    {
      type: "list",
      name: "employeeRole",
      message: "Select the new Role:  ",
      choices: empRole,
    }
  ])
  .then((answers) => {
    let employeeName = answers.employeeName;
    let employeeRole = answers.employeeRole;
    db.query(`SELECT id FROM role WHERE title = ("${answers.employeeRole}")`, (err, res) => {
      if (err) {
        console.log(err);
      }
      var newEmpRole_id = res[0].id;
      db.query(`SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ('${answers.employeeName}')`, (err, result) => {
        if (err) {
          console.log(err);
        }

        var empId = result[0].id;

        var query = `UPDATE employee SET role_id = ? WHERE id = ?`
        db.query(query, [newEmpRole_id, empId], (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("Info Updated");
          mainMenuPrompt();

        })

      })

    })

  })

}
// Initail function for the start
init();
