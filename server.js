const express = require("express");
const  connectDB = require("./ConnectDB/Connect");
const errorHandler = require("./middleware/errorHandler");
const dotenv =require("dotenv").config() 
const cors =require("cors")
const path = require("path")
const app = express()

connectDB()

app.use(express.json())
app.use(cors())
app.use(`/api/contact`,require("./Route/ContactRoute"))
app.use("/api/user",require("./Route/userRoute"))
app.use(errorHandler)
app.use(express.static(path.join(__dirname,"./client/build")))

app.get("*",(req,res)=>{
res.sendFile(
    path.join(__dirname,"./client/build/index.html")
)
})





const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`server is listing ${port}`)
})

