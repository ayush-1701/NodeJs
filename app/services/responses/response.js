exports.successMessage=(req,res,data)=>{
    res.send({message:data})
    res.status(200)
}

exports.successData=(req,res,data)=>{
    res.send(data)
    res.status(200)
}

exports.successNoDataFound=(req,res)=>{
    res.send({message:"no data found"})
    res.status(204)
}

exports.resourceNotFound=(req,res)=>{
    res.send({message:"resource not found"})
    res.status(404)
}

exports.badRequest=(req,res)=>{
    res.send({message:"bad request"})
    res.status(400)
}

exports.authRequired=(req,res)=>{
    res.send({message:"auth required"})
    res.status(401)
}

exports.usernamePasswordNotMatched=(req,res)=>{
    res.send({message:"username and password doesnt match"})
    res.status(401)
}

exports.internalServerError=(req,res)=>{
    res.send({message:"unknown internal server error"})
    res.status(500)
}