'use strict';

const express = require('express');
const {log, error} = require('console')


const app = express();


const port = process.env.PORT || 4002

app.listen(port, (err) => {
    if(!err){
        log(`Server active at port ${port}`)
    } else{
        error(err.message)
    }
})