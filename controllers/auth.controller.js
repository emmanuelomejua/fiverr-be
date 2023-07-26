const { hash } = require('bcrypt');
const User = require('../models/User');
const bcrypt = require('bcrypt')


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
                password: encryptedPassword,
                ...req.body
            })
            const user = await newUser.save()
            const { password, ...otherDetails } = user._doc
            res.status(201).json(otherDetails)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('User already exists, please login')
    }
}


//login
const Login = async (req, res) => {

    const user = await User.findOne({email: req.body.email})
    
    if(user){
        try {
            const isCorrect = await bcrypt.compare(req.body.password, user.password);
            if(isCorrect){
                const { password, ...otherDetails } = user._doc
                 res.status(200).json('Login success!')
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
