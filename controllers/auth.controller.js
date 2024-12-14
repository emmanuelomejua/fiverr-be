'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createError } = require('../middlewares/createError');

//register
const Register = async (req, res, next) => {

    try {
       
        const userExists = await User.findOne({email: req.body.email})

        if(userExists){
            return next(createError(400, 'User already exists, please login'))
        }

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
        
    } catch (error) {
         res.status(500).json(error.message)
    }
}


//login
const Login = async (req, res, next) => {

    
    try {
        const user = await User.findOne({ email: req.body.email })
        
        if(!user){
            return res.status(400).json('Pls provide a valid username or password')
        }
        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isCorrect){
            return next(createError(401, 'Pls provide a valid username and password'))
        }

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, { expiresIn: '7d' }, process.env.JWT_KEY)

        const { password, ...otherDetails } = user._doc
        
        res.cookie('accessToken', token, {
            httpOnly: true
        })
        .status(200)
        .json({...otherDetails, token})
            
        
    } catch (error) {
        res.status(500).json(error.message)
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
        res.status(500).json(error)
    }
}


module.exports = { Register, Login, Logout }
