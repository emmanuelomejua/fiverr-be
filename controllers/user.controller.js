const { createError } = require('../middlewares/createError')
const User = require('../models/User')

//delete user endpoint
const deleteUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id)

        if(!user){
            return next(createError(404, 'User does not exist or already deleted'))
        } else {

            if(req.userId !==  user._id.toString()){

                return next(createError(403, 'You can only delete your account'))

            } else {

                await User.findByIdAndDelete(req.params.id)

                res.status(200).json('User deleted succesfully')
            }
        }
    } catch (error) {
        res.status(200).json(error.message)
    }
}



module.exports = { deleteUser }
