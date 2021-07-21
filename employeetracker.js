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

    // WE will request all the (departments or roles, employees) from DB 
      // --> make a connection.query() call : save that return data into a variable (ARRAY data type)

      // --> map() or forEach( function(item) {} ) loop through the data in the ARRAY variable (make that your CHOICES in inquirer.prompt)
    // [ item.name ]
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

      case 'View Departments':
        viewDepartment();
        break;

      case 'View Roles':
        viewRole();
        break;

      case 'View Employees':
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
            let queryStr = 'INSERT INTO department SET ?';
            connection.query(queryStr, newDepartment, function(error, result) {
              if(error) {
                console.log(error);
              } else {
                // console.log(result);

                // display all departments (including the new one just added)
                  // --> make a request to the DB 
                  // --> call the viewDepartments() and save that into a variable 
                viewDepartment();
                  // --> console.table(DISPLAY_OBJECT)
                // Return to the main menu 
                // --> runSearch();
              }

            })
        })
        .catch(function(error) {
          console.log(error);
        });
}

function addRole() {
  // Prompt the User for the new role 

  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title for this role?",
      validate: answer => {
        if (answer !== "") {
            return true;
        } else {
            return "At least one character is required.";
        }
      }
    },
    {
      name: "salary",
      type: "input",
      message: "What is the roles salary?",
      validate: answer => {
        if (answer !== "") {
            return true;
        } else {
            return "Numeric needed with decimal.";
        }
      }
    },
    {
      name: "department_id",
      type: "input",
      message: "What department is the employee in?",
      validate: answer => {
        if (answer !== "") {
            return true;
        } else {
            return "At least one character is required.";
        }
      }
    },
  ])
      .then(result => {
          console.log(result);


          let newRole = {
              title: result.title,
              salary: result.salary,
              department_id: result.department_id
            }

          let queryStr = 'INSERT INTO role SET ?';
          connection.query(queryStr, newRole, function(error, data) {
            if(error) {
              console.log(error)
            }

            console.log(data);
            viewRole();
          })
      })
}

// function that adds a new employee 
function addEmployee(){
  inquirer.prompt([{
      name: "firstName", 
      type: "input", 
      message: "What is the Employee's First Name?",
      validate: answer => {
      if (answer !== "") {
          return true;
      } else {
          return "At least one character is required.";
      }
    }
  }, 
    {
      name: "lastName", 
      type: "input", 
      message: "What is the Employee's Last Name?",
      validate: answer => {
      if (answer !== "") {
          return true;
      } else {
          return "At least one character is required.";
      }
      }
    },
    
    {
      name: "role", 
      type: "input", 
      message: "What is the Employee's Role?",
      validate: answer => {
      if (answer !== "") {
          return true;
      } else {
          return "At least one character is required.";
      }
    }
    },

    {
      name: "manager", 
      type: "input", 
      message: "Who is the Employee's manager?",
     /* validate: answer => {
      if (answer !== "") {
          return true;
      } else {
          return "At least one character is required.";
      }
    }
    */
  }      
]).then(function (answers) {
  
 // var roleId = selectRole().indexOf(answers.role) + 1
  connection.query("INSERT INTO employee SET ?", 
  {
      first_name: answers.firstName,
      last_name: answers.lastName,
      role_id: answers.role,
      manager_id: answers.manager
  }, 
  function(err){
      if (err) throw err
     // console.table(answers)
      viewEmployees()
  })
  })
}

function viewDepartment() {
  connection.query("SELECT name FROM department", function(err,res) {
    if (err) throw (err);
    // console.log(res)
    console.table(res);

    // call back to main question function
    runSearch();
  });

}

function viewRole() {
  connection.query("SELECT role.id AS ID, role.title, role.salary, role.department_id AS role FROM role",
  function(err,res) {
    if (err) throw (err);
    console.table(res)
    // call back to main question function
    runSearch();
  })
}

function viewEmployees() {
  connection.query("SELECT employee.id AS ID, employee.first_name, employee.last_name, employee.manager_id AS employee FROM employee",
  function(err,res) {
    if (err) throw (err)
    console.table(res)
    // call back to main question function
    runSearch();
  })
}
