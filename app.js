const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const connectToMongoDb = require('./db/mongodb.js')
dotenv.config()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.options('*', cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use(function (req, res, next) {
    // Replace with your domain
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

const api = process.env.API_URL

// Routers
const category_router = require('./routers/category')
const product_router = require('./routers/product')

app.use(`${api}/category`, category_router)
app.use(`${api}/product`, product_router)

// mongodb connect
connectToMongoDb()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(
        'Server in running on port',
        port,
        
    )
})
