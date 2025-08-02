import express from 'express';
import "dotenv/config";
import cors from 'cors';
import mongoose from 'mongoose';
import db from './configs/db.js'
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';



const app =express();

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
  res.send("server is running")
})

app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)

 await db();


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  
  console.log(`app start listening at localhost:// ${PORT}`)
})

