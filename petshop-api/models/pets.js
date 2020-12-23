const connection = require('../infra/database/connection')
const fileUpload = require('../infra/files/uploadFiles')

class Pet {
    add(pet, res) {
        const query = 'INSERT INTO pets SET ?'

        fileUpload(pet.img, pet.nome, (error, newPath) => {
            if (error){
                res.status(400).json({error})
            } else {
                const newPet = { nome: pet.nome, img: newPath}

                connection.query(query, newPet, error => {
                    if(error) {
                        console.log(error)
                        res.status(400).json(error)
                    } else {
                        res.status(200).json(newPet)
                    }
                })
            } 
        })
        
    }
}

module.exports = new Pet()