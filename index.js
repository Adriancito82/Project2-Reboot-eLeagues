const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express();

(async function(){
    await mongoose.connect(process.env.URL, {
        dbName: process.env.MONGO_DB
    })
    console.log('Connected to DB')

    app
    .use(cors('*'))
    .use(morgan('dev'))
    .use(express.json())
    .use('/api',require('./api/routes'))
    .listen(process.env.PORT, () => {
        console.log(`connected to port: ${process.env.PORT}`)
    })
})()

