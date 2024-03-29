const catchasyncerror = require('./AsyncError');
const jwt = require('jsonwebtoken');
const user = require('../Models/UserModel');
const Admin = require('../Models/AdminModel');



exports.authenticate = catchasyncerror(async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next({message:"Please login",statusCode:401});
    }

    const DecodedData = jwt.verify(token,process.env.SEC_KEY);

    req.user = await user.findById(DecodedData.id);
    req.Admin = await Admin.findById(DecodedData.id);
    next();
})

exports.authenticaterole = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next({message:`Role: ${req.user.role} is not allowd access`, statusCode:403});
        }
        next();
    };
     
};
