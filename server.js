import express  from 'express';
import colors from 'colors';
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'

import cors from 'cors'


//env file 
dotenv.config()

//DATABASE CONECTION
connectDB()

//rest onject
 const app =express();

 //middleware morgan
app.use(cors())
 app.use(express.json())
 app.use(morgan('dev'))
 
 

 //routes
 app.use('/api/v1/auth',authRoutes)
//category route
app.use('/api/v1/category',categoryRoute)
//product route
app.use('/api/v1/product',productRoute)





 //rest api

 app.get("/",(req,res)=>{

    res.send("WELCOME TO ECOMMERCE APP")
 })

 //port
 const Port = 8000
//run listen

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`.bgYellow.black);

})