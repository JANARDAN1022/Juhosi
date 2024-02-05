const asyncerrorhandler = require('../Middlewares/AsyncError.js');
const User = require('../Models/UserModel.js');
const sendToken = require('../utils/JWToken.js');
const AdminModel = require('../Models/AdminModel.js');




//Register User 
exports.RegisterUser = asyncerrorhandler(async(req,res,next)=>{
   const {ID, Password,Role}=req.body;
   const UserExists = await User.findOne({ID});
   if(UserExists){
      return next({message:'User already Exists LogIn Instead',statusCode:404});
   }else{
    const user = await User.create({
    ID:ID,
    Password:Password,
    Role:Role?Role:'user', 
    });
    sendToken(user,200,res);
   }
});



//Login User
exports.LoginUser= asyncerrorhandler(async(req,res,next)=>{
    const {ID,Password} = req.body;
  
    if(!ID || !Password){
      return next({message: 'Please Enter ID And Password', statusCode: 400})
    }
  
    const user = await User.findOne({ID}).select('+Password');
  
    if(!user){
      return next({message:'User Does Not Exists, Check Your ID and Password again',statusCode:404});
    }
  
    const Passwordmatched = await user.comparePassword(Password);
    if(!Passwordmatched){
      return next({message:'Incorrect ID or Password',statusCode:401});
    }else{
    sendToken(user,200,res);
    }
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



  //Load User On Reload 
exports.LoadUser = asyncerrorhandler(async(req,res,next)=>{

  const user = await User.findById(req.user.id);
  res.status(200).json({
      success:true,
      user
  });

});


// Update User Details
exports.UpdateUserDetails = asyncerrorhandler(async (req, res, next) => {
  const { userID } = req.params;
  const updateFields = req.body;

  // Required fields and their validation rules
  const requiredFields = ['orderDate', 'company', 'owner', 'Item', 'quantity', 'weight', 'requestForShipment', 'trackingID', 'shipmentSize', 'boxCount', 'specification', 'checklistQuantity'];

  // Checking if all required fields are present in the request body and pass validation
  const missingFields = [];
  for (const field of requiredFields) {
      if (!(field in updateFields)) {
          missingFields.push(field);
      }
  }

  // If any required field is missing or invalid, return an error response
  if (missingFields.length > 0) {
      return next({ message: `Missing required fields: ${missingFields.join(', ')}`, statusCode: 400 });
  } else {
      try {
          // Find the user by ID
          let user = await User.findById(userID);

          if (!user) {
              return next({ message: 'User not found', statusCode: 404 });
          }

          // Update user object with provided fields
          for (const key in updateFields) {
              if (Object.hasOwnProperty.call(updateFields, key)) {
                  user[key] = updateFields[key];
              }
          }

          // Save the updated user object
          await user.save();

          // Return success response
          res.status(200).json({ success: true, message: 'User details updated successfully', user });
      } catch (error) {
          return next(error);
      }
  }
});




//Fetch All Customers
//Login User
exports.GetAllUsers= asyncerrorhandler(async(req,res,next)=>{
      const Customers = await User.find();
      if(Customers && Customers.length>0){
        res.status(200).json({ success: true, Customers });
      }else{
        res.status(200).json({ success: true, message: 'No Customers Found'});
      }
});


