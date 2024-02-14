const express = require("express")
const app = express()

app.get('/registration',(req,res)=>{
    res.send("test")
})

app.listen(8000,()=> console.log("server started listening"));