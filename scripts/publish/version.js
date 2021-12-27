const path = require('path')
const fs = require('fs')

function getPackage(dir) {
    const pckPath = path.resolve(dir, 'package.json')
    return require(pckPath)
}

function updateVersion(dir, newVersion) {
    const context = getPackage(dir)
    const oldContext = JSON.parse(JSON.stringify(context))
    const errReset = () => {
        writePackage(dir, oldContext)
    }
    context.version = newVersion
    writePackage(dir, context)
    return errReset
}

function writePackage(dir, context) {
    const pckPath = path.resolve(dir, 'package.json')
    fs.writeFileSync(pckPath, JSON.stringify(context, '', '\t'), {
        flag: 'w'
    })
}

function setVersion(oldVersion, updateVersionType) {
    const versions = oldVersion.split('.')
    const bigVersion = +versions[0]
    const smallVersion = +versions[1]
    const patchVersion = +versions[2]
    let newVersion = ''
    switch (updateVersionType) {
        case 0:
            newVersion = `${bigVersion + 1}.0.0`
            break
        case 1:
            newVersion = `${bigVersion}.${smallVersion + 1}.0`
            break
        case 2:
            newVersion = `${bigVersion}.${smallVersion}.${patchVersion + 1}`
            break
    }
    return newVersion
}

module.exports = {
    updateVersion,
    setVersion,
    getPackage
}
