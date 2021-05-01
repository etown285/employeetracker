const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'cedar791',
  database: 'employee_DB',
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
  });

    //Direct the user what they want to search 
  const runSearch = () => {
      inquirer
      .prompt({
        name: 'choices',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Add a Department', 'Add a Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees by Department', 'View Employee Roles' ]
    })
  
    .then((answer) => {
        console.log(answer);
    switch (answer.choices) {
      case 'Add a Department':
        addDepartment();
        break;

      case 'Add Employee':
        addEmployee();
        break;

      case 'Add a Role':
        addRole();
        break;

      case 'Remove Role':
        removeRole();
        break;

      case 'View Department':
        viewDepartment();
        break;

      case 'View Roles':
        viewRole();
        break;

      case 'Remove Role':
        viewEmployees();
        break;
      
      case 'Update Employee Role':
        updateRole();
        break;

      case 'Exit':
        connection.end();
        break;
     }
  });
};

function addDepartment() {
    // Prompt the User for the new NAME

    inquirer.prompt({
        name: "departmentName"
    })
        .then(result => {
            console.log(result);


            let newDepartment = {
                name: result.departmentName
            }
            let queryStr = 'INSERT INTO department (name) VALUES ?';
            connection.query(queryStr, newDepartment)
        })
}

function addRole() {
  // Prompt the User for the new role 

  inquirer.prompt({
      name: "roleid"
  })
      .then(result => {
          console.log(result);


          let newRole = {
              name: result.roleId
          }
          let queryStr = 'INSERT INTO role (name) VALUES ?';
          connection.query(queryStr, newRole)
      })
}

// function that adds a new employee 
function addEmployee(){[
  inquirer.prompt({
      name: "firstName", 
      type: "input", 
      message: "What is the Employee's First Name?",
      validate: answer => {
      if (answer !== "") {
          return true;
      } else {
          return "At least one character is required.";
      }
    }, 

      name: "lastName", 
      type: "input", 
      message: "What is the Employee's First Name?",
      validate: answer => {
      if (answer !== "") {
          return true;
      } else {
          return "At least one character is required.";
      }
      },
    
      name: "role", 
      type: "list", 
      message: "What is the Employee's First Name?",
      validate: answer => {
      if (answer !== "") {
          return true;
      } else {
          return "At least one character is required.";
      }
      }      
  })].then(function (answers) {
  
  var roleId = selectRole().indexOf(answers.role) + 1
  connection.query("INSERT INTO employees SET ?", 
  {
      firstName: answers.firstName,
      lastName: answers.lastName,
      roleID: roleId
      
  }, 
  function(err){
      if (err) throw err
      console.table(answers)
      runEmployeeDB()
  })
  })
}

function viewDepartment() {
  connection.query("SELECT department.id AS ID, department.name AS department FROM department",
  function(err,res) {
    if (err) throw (err)
  })
}

