const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findById } = require('../models/userModel')

async function createUser(req, res){
    try {        
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const user = await UserModel.create(req.body)
        const payload = { email: user.email }
        const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'})
        res.status(200).json({ email: user.email, token: token })
        
    } catch (error) {
        console.log(error)  
    }
}

async function login(req, res){
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) return res.status(500).send('email or password incorrect')

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) return res.status(500).send(`error: ${err}`)
            if (!result) return res.status(500).send('email or password incorrect')
        })
        const payload = { email: user.email }
        const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'})
        res.status(200).json({ email: user.email, token: token })
    } catch (error) {
        console.log(error)
    }
}

async function getUserById(req, res){
    try {
        const user = await UserModel.findById(req.params.id)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

async function getAllUsers(req, res){
    try {
        const allUsers = await UserModel.find()
        res.json(allUsers)
    } catch (error) {
        console.log(error)
    }
}

async function userProfile(req, res){
    try {
        const userProfile = await UserModel.findById(res.locals.user.id)
        res.json(userProfile)
    } catch (error) {
        console.log(error)
    }
}

async function updateUserById(req, res){
    try {
        const userUpdate = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(userUpdate)
    } catch (error) {
        console.log(error)
    }
}

async function updateUserProfile(req, res){
    try {
        const updateUserProfile = await UserModel.findByIdAndUpdate(res.locals.user.id, req.body, {new: true})
        res.json(updateUserProfile)
    } catch (error) {
        console.log(error)
    }
}

async function deleteUserById(req, res){
    try {
        const userDelete = await UserModel.findByIdAndDelete(req.params.id)
        res.json(userDelete)
    } catch (error) {
        console.log(error)
    }
}

async function deleteUserProfile(req, res){ 
    try {
        const deleteUserProfile = await UserModel.findByIdAndDelete(res.locals.user.id)
        res.json(deleteUserProfile)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUser,
    login,
    getUserById,
    getAllUsers,
    userProfile,
    updateUserProfile,
    updateUserById,
    deleteUserProfile,
    deleteUserById
} 