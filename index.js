'use strict';

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
const { movieRoute, authRoute } = require('./routes/index')


//crosss origin resource
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: ['PUT, GET', 'PATCH', 'POST', 'DELETE'],
    'Content-Type': 'Authorization'

}))


//use of middlewares
app.use(json())
app.use(urlencoded({extended: false}))
app.use(morgan('common'))
app.use(helmet())
app.use(cookieParser())



//Routes use here
app.use('/api/movies', movieRoute)
app.use('/api/auth',  authRoute)


const port = process.env.PORT

app.listen(port, (err) => {
    if(!err){
        log(`Server active at port ${port}`)
    } else{
        error(err.message)
    }
})
