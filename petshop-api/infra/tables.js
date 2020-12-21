class Tables{
    init(connection){
        this.connection = connection

        this.createAtendimentos()
        this.createPets()
    }

    createAtendimentos(){
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT,
            client varchar(50) NOT NULL,
            pet varchar(20),
            service varchar(20) NOT NULL,
            date datetime NOT NULL,
            createdDate datetime NOT NULL,
            status varchar(20) NOT NULL,
            observations text,
            PRIMARY KEY(id))`

        this.connection.query(sql, (error) => {
            if(error) {
                console.log(error);
            }else {
                console.log('Table atendimento was create');
            }
        })
    }

    createPets(){
        const query = `CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT,
            nome varchar(50),
            img varchar(200),
            PRIMARY KEY (id))`

            this.connection.query(query, error =>{
                if(error){
                    console.log(error);
                } else {
                    console.log('Pet table was created');
                }
            })
    }
}

module.exports = new Tables