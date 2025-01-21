const { createError } = require('../middlewares/createError')
const User = require('../models/User')

//delete user endpoint
const deleteUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return next(createError(404, 'User does not exist or already deleted'));
        }

        if(req.userid !== user._id.toString()){
            return next(createError(401, 'Unauthorized access'));
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({msg: 'User successfully deleted'})
    } catch (error) {
        res.status(500).json(error)
    }


}



const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(createError(404, 'User not found or does nnot exist'));
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}



module.exports = { deleteUser, getUser }
