const fs = require ('fs')
const { type } = require('os')
const path = require('path')

module.exports = (receivedPath, fileName, callbackCreatedImage) => {

    const validTypes = ['jpg', 'png', 'jpeg']
    const fileType = path.extname(receivedPath)

    const isValidType = validTypes.indexOf(fileType.substring(1)) !== -1
    
    if(isValidType){
        const newPath = `./assets/img/${fileName}${fileType}`

        fs.createReadStream(receivedPath)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => callbackCreatedImage(false, newPath))

    } else {
        const error = 'File type is invalid'
        console.log('File type invalid');
        callbackCreatedImage(error)
    }

    
}

