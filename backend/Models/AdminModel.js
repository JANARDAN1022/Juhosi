const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const AdminSchema = new mongoose.Schema({
    ID:{
        type:String,
        required:[true,"Please Enter Your Customer ID"],
        unique:true,
    },
    Password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        select:false
    },
    Role:{
        type:String,
        default: 'admin' 
    },
});


//hiding Password
AdminSchema.pre("save",async function(next){
    if(!this.isModified("Password")){
        next();
    }
    this.Password = await bcrypt.hash(this.Password,10);    
})
//jwt token
 

AdminSchema.methods.getjwtToken = function(){
    return jwt.sign({id:this._id},process.env.SEC_KEY,{
        expiresIn: process.env.jwtExpire
    });
};

//compare Password

AdminSchema.methods.comparePassword = async function(enteredPassword){
    return  await  bcrypt.compare(enteredPassword,this.Password);
}

module.exports = mongoose.model("Admin",AdminSchema);