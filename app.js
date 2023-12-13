const express = require('express')
const cors = require('cors')

const mongoose  = require('mongoose')

const app = express();

app.use(cors())
app.use(express.json())

//schema

const schemaData = mongoose.Schema({
    name: String,
    email:String,
    mobile:String,
},{

timestamps:true
})

const userModel = mongoose.model("user",schemaData)

//get use here  for read
//http://localhost:3000/
app.get('/', async(req,res)=>{
    const data = await userModel.find({})
    console.log(data)
    res.json({success:true,data:data,data})
})

// create data // save data in
//http://localhost:3000/create
// {
//     name,
//email,
//mobile,
// }
app.post('/create',async (req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success:true,message:'data save succefully',data:data})
  
  
})
// update data
//http:localhost:3000/update

/**
 * {
 * id:"",
 * name:""
 * email:""
 * mobile:""
 * }
 */
app.put('/update', async (req,res)=>{
console.log(req.body)
const {_id,...rest} = req.body
console.log(rest)
const data = await  userModel.updateOne({_id: _id},rest)
res.send({success: true,message:'update successfully',data})

})
// DELETE
//http://localhost:3000/delete/:id

app.delete('/delete/:id',async (req,res)=>{
const id = req.params.id;
console.log(id)
const data = await userModel.deleteOne({_id:id})
res.send({success:true,message:"deleted succefully",data})
})


const PORT = process.env.PORT || 4000

mongoose.connect("mongodb://localhost:27017/crud").then(()=>{
    console.log('connecte to db')
    app.listen(PORT,()=>console.log("Server is running"))
}).catch((err)=>console.log(err))
    


