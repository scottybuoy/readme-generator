const fs = require("fs");
const inquirer = require("inquirer");

// Make function to prompt user for info to provide content for readme
let promptUser = () => {
    // Use inquirer to present sequence of questions
    inquirer.prompt(
        [{
            type: "input",
            name: "title",
            message: "Title section. Provide a title for your project"
        },

        {
            type: "input",
            name: "description",
            message: "Description section. Provide a description for your project"
        },

        {
            type: "input",
            name: "installation",
            message: "Installation section. Provide the steps to install your project."
        },

        {
            type: "input",
            name: "usage",
            message: "Usage section. Provide instructions and examples for use."
        },

        {
            type: "input",
            name: "usageGif",
            message: "Please provide a link or path to a gif demonstrating usage."
        },

        {
            type: "input",
            name: "usageAlt",
            message: "Pleaes provide alt text for your gif."
        },

        {
            type: "input",
            name: "contributing",
            message: "Contributors section. Provide information on what the user needs to know in regards to contributing to the repository."
        },

        {
            type: 'input',
            name: 'test', 
            message: 'Test section. What command should be run to run tests?',
            default: 'npm test'
        },

        {
            type: 'list',
            name: 'license',
            message: 'Please select a license for your project.',
            choices: ['MIT', 'GNU'],
            default: ["MIT"],
        },

        {
            type: "input",
            name: "github",
            message: "Provide your github username."
        },

        {
            type: "input",
            name: "email",
            message: "Provide your email address."
        },


    ]
        // Inquirer is promise based, so use then() with parameter of userResponse
    ).then((userResponse) => {
         // Inside promise call function that generates readme
        generateReadme(userResponse);
    })
}
    

// Create  function  that generates readme
let generateReadme = (userInput) => {
    var projectLicense;
    if (userInput.license === 'MIT') {
        projectLicense = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
    } else {
        projectLicense = '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)'


    }
    // create variable that represents string of readme content with variables for user input using template literals

    const readmeString = `

# ${userInput.title}

${projectLicense}

## Description 
${userInput.description}


## Table of Contents


* [Installation](#installation)
* [Usage](#usage)
* [Contributing] (#contributing)
* [Credits](#credits)
* [License](#license)


## Installation

${userInput.installation}


## Usage 

${userInput.usage}




![${userInput.usageAlt}](a${userInput.usageGif})



## Contributing



## License

This project is licensed under ${userInput.license}.


## Questions

If you have any questions about this project, please contact me at ${userInput.email}. <br>
More projects can be viewed at https://github.com/${userInput}
`
    
    // Use fs.writeFile, 3 params of readme.md, variable for readme content, and error handler function


    fs.writeFile("README.md", readmeString, (err) => {
        err ? console.log(err) : console.log("Your readme.md has been written successfully")
    })

}


promptUser();