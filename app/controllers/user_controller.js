const User = require('../models/user_model')
const bcrypt = require('bcrypt')

const Auth = require('../services/auth/auth')
const Response = require('../services/responses/response')
let UserData = User.USER_DATA

exports.signup = (req, res) => {
    let plaintext = req.body.password
    bcrypt.hash(plaintext, Number(process.env.SALT_ROUNDS), (err, hash) => {
        if (err) {
            console.log(err)
        }
        if (hash) {
            let userObject = {}
            for (let key in req.body) {
                if (key !== "password") {
                    userObject[key] = req.body[key]
                } else {
                    userObject["password"] = hash
                }
            }
            UserData.push(userObject)
            let { password, ...dataobject } = userObject
            Response.successData(req, res, { user: dataobject })
        }
    })
}

exports.login = (req, res) => {
    users = UserData.filter((user)=>{
        return user.username===req.body.username
    })
    if(users.length>0){
        let cipher = users[0].password
        bcrypt.compare(req.body.password,cipher,(err,result)=>{
            if(result){
                let token = Auth.generateToken({username:req.body.username,password:users[0].password})
                Response.successData(req,res,{token:token})
            }else{
                Response.usernamePasswordNotMatched(req,res)
            }
        })
    }else{
        Response.successNoDataFound(req,res)
    }
}

exports.getAll = (req, res) => {
    let res_list = []
    for (let i = 0; i < UserData.length; i++) {
        let { password, ...safeObject } = UserData[i]
        res_list.push(safeObject)
    }
    Response.successData(req, res, { data: res_list })
}

exports.getById = (req, res) => {
    users = UserData.filter((user) => {
        return user.username === req.params.id
    })
    if (users.length > 0) {
        let { password, ...safeObject } = users[0]
        Response.successData(req, res, { data: safeObject })
    } else{
        Response.successNoDataFound(req, res)
    }
}

exports.updateById = (req, res) => {
    users = UserData.filter((user, index) => {
        return user.username === req.params.id
    })
    if (users.length > 0) {
        let updateable = req.body
        for (var key in updateable) {
            if (key !== "password") {
                users[0][key] = updateable[key] //updating using the shallow copy
            }
        }
        let { password, ...safeObject } = users[0]
        Response.successData(req, res, { updated: safeObject })
    }else{
        Response.successNoDataFound(req, res)
    }
}

exports.deleteById = (req, res) => {
    index = UserData.findIndex(user => user.username === req.params.id);
    if (index !== -1) {
        users = UserData.filter((user) => {
            return user.username !== req.params.id
        })
        UserData = users
        Response.successData(req, res, { deleted: req.params.id })
    }else{
        Response.successNoDataFound(req,res)
    }
}

exports.updatePassword = (req, res) => {
    index = UserData.map((user, index) => {
        return user.username === req.params.id ? index : -1
    })[0]
    if (index !== -1) {
        let updateable = req.body
        for (var key in updateable) {
            if (key === "password") {
                let plaintext = req.body.password
                bcrypt.hash(plaintext, Number(process.env.SALT_ROUNDS), (err, hash) => {
                    if (err) {
                        console.log(err)
                    }
                    if (hash) {
                        UserData[index].password = hash//updating using the shallow copy
                        let { password, ...safeObject } = UserData[index]
                        Response.successData(req, res, { updated: safeObject })
                    }
                })
            }
        }
    }else{
        Response.successNoDataFound(req, res)
    }
}