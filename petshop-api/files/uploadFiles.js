const fs = require ('fs')

fs.createReadStream('./assets/Dachshund.png')
    .pipe(fs.createWriteStream('./assets/Dachshund-stream.png'))
    .on('finish', () => console.log('img was written'))