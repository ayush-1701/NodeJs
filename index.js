const express = require('express')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const UserRoutes = require('./app/routes/user_routes')

const Responses = require('./app/services/responses/response')

app.use('/api/user',UserRoutes)

// handling 404
app.use(Responses.resourceNotFound)

app.listen(3000,()=>{
    console.log("server running on port:",3000)
})