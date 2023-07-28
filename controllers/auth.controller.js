'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createError } = require('../middlewares/createError');

//register
const Register = async (req, res, next) => {

    try {
       
        const userExists = await User.findOne({email: req.body.email})
        if(!userExists){
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(req.body.password, salt)
            try {
                const newUser = await User.create({
                    ...req.body,
                    password: hash
                })
                const user = await newUser.save()
                const { password, ...otherDetails } = user._doc
                res.status(201).json(otherDetails)
            } catch (error) {
                res.status(500).json(error.message)
            }
        } else {
            return next(createError(403, 'User already exists, please login'))
        }
    } catch (error) {
         res.status(500).json(error.message)
    }
}


//login
const Login = async (req, res, next) => {

    const user = await User.findOne({email: req.body.email})
    
    if(user){
        try {
            const isCorrect = await bcrypt.compare(req.body.password, user.password);
            if(isCorrect){
                const token = jwt.sign({
                    id: user._id,
                    isSeller: user.isSeller
                }, process.env.JWT_KEY)
                const { password, ...otherDetails } = user._doc
                
                res.cookie('accessToken', token, {
                    httpOnly: true
                })
                .status(200)
                .json(otherDetails)
                
            } else {
                return next(createError(401, 'Pls provide a valid username and password'))
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(404).json('Pls provide a valid username or password')
    }
}


//logout
const Logout = async (req, res) => {
    try {
        res.clearCookie('accessToken', {
            sameSite: 'none',
            secure: true,
        }).status(200).send('User has been logged out')
    } catch (error) {
        
    }
}


module.exports = { Register, Login, Logout }
