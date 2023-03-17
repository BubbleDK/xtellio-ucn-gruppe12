const {MongoClient} = require('mongodb');

let dbconnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb+srv://gruppe12:<test1234>@cluster0.o9hgjso.mongodb.net/?retryWrites=true&w=majority')
        .then((client) => {
            dbconnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbconnection
}