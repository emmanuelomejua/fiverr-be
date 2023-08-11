'use strict';

require('dotenv').config()

const express = require('express');
const cors = require('cors')
const { log, error } = require('console')
const { json, urlencoded } = express
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const connectDB = require('./config')

const app = express();
connectDB()

//routes import
const { movieRoute, authRoute, gigRoute, orderRoute, reviewRoute, userRoute } = require('./routes')


//crosss origin resource
app.use(cors({
    origin: '*', 
    credentials: true,
    methods: ['PUT, GET', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization']

}))


//use of middlewares
app.use(json())
app.use(urlencoded({extended: false}))
app.use(morgan('common'))
app.use(helmet())
app.use(cookieParser())

//error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errMsg = err.message || 'Something went wrong'

    return res.status(errorStatus).send(errMsg);
})


//Routes use here
app.use('/api/movies', movieRoute)
app.use('/api/auth',  authRoute)
app.use('/api/gig', gigRoute)
app.use('/api/order', orderRoute)
app.use('/api/review', reviewRoute)
app.use('/api/user', userRoute)


const port = process.env.PORT

app.listen(port, (err) => {
    if(!err){
        log(`Server active at port ${port}`)
    } else{
        error(err.message)
    }
})
