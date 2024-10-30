const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

function connectToMongoDb () {
    mongoose
    .connect(process.env.CONNECTION_STRING, {
        dbName: "TMDT"
    })
    .then(() => {
        console.log('Database connection is ready')
    })
    .catch((err) => {
        console.log(err)
    })
}


module.exports = connectToMongoDb