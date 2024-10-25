const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({ message : "Access token is missing."});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err){
            return res.status(403).json({message : "Invalid or expired access token"})
        }
        req.user = user ;
        next();
    })
});
 
const PORT =5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
