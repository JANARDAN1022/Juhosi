const asyncerrorhandler = require('../Middlewares/AsyncError.js');
const AdminModel = require('../Models/AdminModel.js');
const sendToken = require('../utils/JWToken.js');



//Login Admin
exports.LoginAdmin= asyncerrorhandler(async(req,res,next)=>{
    const {ID,Password} = req.body;
  
    if(!ID || !Password){
      return next({message: 'Please Enter ID And Password', statusCode: 400})
    }
  
    const Admin = await AdminModel.findOne({ID}).select('+Password');
  
    if(!Admin){
      return next({message:'User Does Not Exists, Check Your ID and Password again',statusCode:404});
    }else if(Admin.Role!=='admin'){
        return next({message:'Requested User is Not a Admin, Check Your ID and Password again',statusCode:401});
    }else{ 
    const Passwordmatched = await Admin.comparePassword(Password);
    if(!Passwordmatched){
      return next({message:'Incorrect ID or Password',statusCode:401});
    }else{
    sendToken(Admin,200,res);
    }
}
  });

  //Register Admin
exports.RegisterAdmin = asyncerrorhandler(async(req,res,next)=>{
    const {ID, Password}=req.body;
    const AdminExists = await AdminModel.findOne({ID});
    if(AdminExists){
       return next({message:'Admin already Exists Log-In Instead',statusCode:404});
    }else{
     const Admin = await AdminModel.create({
     ID:ID,
     Password:Password,
     });
     sendToken(Admin,200,res);
    }
 });


 //Load User On Reload 
exports.LoadAdmin = asyncerrorhandler(async(req,res,next)=>{

    const Admin = await AdminModel.findById(req.Admin.id);
    res.status(200).json({
        success:true,
        Admin
    });
  });


 //logout
 exports.logout = asyncerrorhandler(async (req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true,
        path:'/',
        secure: true, // frontend is served over HTTPS     
     });  
    res.status(200).json({success:true,message:"logged out"});
  });

 


