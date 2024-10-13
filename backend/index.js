const express= require('express');
const cors=require('cors');
const {PORT}= require('./config/config');
const db= require('./connections/db');
const userRoutes = require('./routes/userRoutes'); 
const imageRoutes = require('./routes/imageRoutes'); 

const app= express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

app.use('/',()=>{
    console.log('hey how are you');
})

app.listen(PORT,()=>{
    console.log(`Server is running on Port: ${PORT}`);
})
