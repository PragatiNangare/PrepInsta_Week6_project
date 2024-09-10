const Food = require('./models/Food');
const express = require('express');
const cors= require('cors');
const app= express();
const port= 3200;
require('./db/conn');
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send("<h1> Welcome to API Creation</h1>")
})

//CREATE
app.post('/foodInfo', async(req, res)=>{
    try{
        const addRecord = await Food.create(req.body);
        res.status(201).json(addRecord);
    }
    catch(e){
        res.status(400).json({ message: e.message });
    }
})

//READ
app.get('/getfoodInfo', async(req,res)=>{
    try{
        const getFood= await Food.find({});
        res.status(201).send(getFood);
    }
    catch(e){
        console.log(e);
    }
})

app.get('/getfoodInfo/:_id', async(req,res)=>{
    const id = req.params._id;
    try{
        const foodData= await Food.findOne({_id:id});
        if(!foodData){
            return res.status(404).json({error: "Food not Found"});
        }
        res.status(200).json(foodData);
    }
    catch(e){
        console.log(e);
    }
})

//DELETE
app.delete('/foodInfo/:_id', async(req,res)=>{
    const id = req.params._id;
    try{
        const deletedRecord = await Food.findOneAndDelete({_id:id});
        if(!deletedRecord){
            return res.status(404).json({error: "Food not Found"});
        }
        res.status(200).json(deletedRecord);
    }
    catch(e){
        console.log(e);
    }
})

// UPDATE
app.put('/foodInfo/:_id', async(req,res)=>{
    const id = req.params._id;
    const updates = req.body; // Data to update
    try{
        const updatedRecord = await Food.findByIdAndUpdate(id, updates, { new: true }); // Update and return the modified document
        if(!updatedRecord){
            return res.status(404).json({error: "Food not Found"});
        }
        res.status(200).json(updatedRecord);
    }
    catch(e){
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.listen(port, ()=>{
    console.log(`Server is listening at port number ${port}`)
});