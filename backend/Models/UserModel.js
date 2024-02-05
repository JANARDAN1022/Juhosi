const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
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
        default: 'user' 
    },

    orderDate: {
        type:String,
        default: '' 
    }, // Date format: YYYY-MM-DD
        company: {
        type:String,
        default: '' 
    }, // Alphanumeric characters only
        owner: {
        type:String,
        default: '' 
    }, // Alphanumeric characters only
        Item: {
        type:String,
        default: '' 
    }, 
        quantity: {
              type:Number,
              default:0
            }, // Integer value
        weight: {
              type:Number,
              default:0
            }, // Float value
        requestForShipment: {
        type:String,
        default: '' 
    },
        trackingID: {
        type:String,
        default: '' 
    },
        shipmentSize: {
            length:{
              type:Number,
              default:0
            },
            breadth: {
              type:Number,
              default:0
            },
            height: {
              type:Number,
              default:0
            },
        },
        boxCount: {
            type:Number,
            default:0
          }, // Integer value
        specification: {
        type:String,
        default: '' 
    },
        checklistQuantity: {
        type:String,
        default: '' 
    }, 


});


//hiding Password
userSchema.pre("save",async function(next){
    if(!this.isModified("Password")){
        next();
    }
    this.Password = await bcrypt.hash(this.Password,10);    
})
//jwt token
 

userSchema.methods.getjwtToken = function(){
    return jwt.sign({id:this._id},process.env.SEC_KEY,{
        expiresIn: process.env.jwtExpire
    });
};

//compare Password

userSchema.methods.comparePassword = async function(enteredPassword){
    return  await  bcrypt.compare(enteredPassword,this.Password);
}

module.exports = mongoose.model("user",userSchema);