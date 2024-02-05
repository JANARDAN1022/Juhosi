const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const ErrorHandler = require('./Middlewares/ErrorHandler');
const cors = require('cors');
const UserRoutes = require('./Routes/UserRoutes');
const AdminRoutes = require('./Routes/AdminRoutes');
const app = express();


app.use(bodyparser.urlencoded({extended:true}));
app.use(cors({
  origin:'http://localhost:5173', 
  credentials: true,
  exposedHeaders: 'Access-Control-Allow-Private-Network',
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/Users/',UserRoutes);
app.use('/api/Admin/',AdminRoutes);

app.use(ErrorHandler);


app.get('/',(req,res)=>{
  res.json('Wroking, Hello From Juhosi Assignment');
  });



module.exports = app;