'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//encrypt password
const encryptedPassword = (password) => {
    const hashedpassword = bcrypt.hashSync(password, bcrypt.genSalt(10), null)
    return hashedpassword;
}

//register
const Register = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email})
    if(!userExists){
        try {
            const newUser = await User.create({
                ...req.body,
                password: encryptedPassword(password)
            })
            const user = await newUser.save()
            const { password, ...otherDetails } = user._doc
            res.status(201).json(otherDetails)
        } catch (error) {
            res.status(500).json(error.message)
        }
    } else {
        res.status(403).json('User already exists, please login')
    }
}


//login
const Login = async (req, res) => {

    const user = await User.findOne({email: req.body.email})
    console.log(user)
    if(user){
        try {
            const isCorrect = await bcrypt.compare(req.body.password, user.password);

            console.log(isCorrect)
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
                res.status(401).send('Pls provide a valid username and password')
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

    } catch (error) {
        
    }
}


module.exports = { Register, Login, Logout }
