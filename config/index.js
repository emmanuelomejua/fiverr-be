'use strict';

require('dotenv').config()

const mongoose = require('mongoose')
const { set, connect } = require('mongoose');
const { log, error } = require('console')


const connectDB = () => {
    set('strictQuery', true)

    connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
        log('DB connection successful')
    })

    mongoose.connection.on('error', (err) => {
        error(`An error occured ${err.message}`)
    })

    mongoose.connection.on('disconnected', () => {
        log('Disconnected from DB')
    })
}

module.exports = connectDB
