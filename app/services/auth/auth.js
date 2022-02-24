const jwt = require('jsonwebtoken')
const Response = require('../responses/response')

const validity = 60 * 60 * 24 //one day

exports.generateToken = (payload) => {
    let token_payload = {
        logintime: Date.now(),
        data: payload,
        role: "user"
    }
    let token = jwt.sign(token_payload, process.env.JWT_SECRET, { expiresIn: validity })
    return token
}

exports.verifyToken = (req, res, next) => {
    let payload = req.headers.authorization;
    if (payload) {
        let token = payload.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                console.log("error")
            } 
            if(decoded){
                next()
            }
        });
        
    }else{
        return Response.authRequired(req,res)
    }

}