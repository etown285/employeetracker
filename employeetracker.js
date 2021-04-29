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
        choices: ['Add a Department', 'View Departments']
    })
  
    // .then((answer) => {
    //     console.log(answer);
    // switch (answer.choices) {
    //   case 'Add a Department':
    //     addDepartment();
    //     break;

    //   case 'Find all artists who appear more than once':
    //     multiSearch();
    //     break;

    //   case 'Find data within a specific range':
    //     rangeSearch();
    //     break;

    //   case 'Search for a specific song':
    //     songSearch();
    //     break;

    //   case 'Find artists with a top song and top album in the same year':
    //     songAndAlbumSearch();
    //     break;

    //   default:
    //     console.log(`Invalid action: ${answer.action}`);
    //     break;
    // }
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