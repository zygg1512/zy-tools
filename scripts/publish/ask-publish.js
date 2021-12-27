const inquirer = require('inquirer')
const { runPublish } = require('./index')
inquirer
    .prompt([
        {
            type: 'confirm',
            message: '是否发布包',
            name: 'isPublish'
        }
    ])
    .then(({ isPublish }) => {
        if (!isPublish) return
        runPublish()
    })
