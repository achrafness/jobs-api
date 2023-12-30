const User = require("../models/User")
const { StatusCodes }=require("http-status-codes")
const {BadRequestError,UnauthenticatedError} = require("../errors")
const bcrypt = require("bcryptjs")
const register = async (req,res) =>{
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({userName:user.name ,token})
}
const login = async (req,res) =>{
    const {email,password}= req.body
    if(!email || !password){
        throw new BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({email})
    const passwordMatch = await user.comparePassword(password)
    if(!user || !passwordMatch){
        throw new UnauthenticatedError("Invalid information")
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name} , token})
}
const deleteAll = async (req,res) =>{
    const user = await User.deleteMany({})
    res.status(StatusCodes.CREATED).json(user)
}
module.exports = {
    register, 
    login,
    deleteAll,
}
