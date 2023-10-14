const express = require("express");
const  connectDB = require("./ConnectDB/Connect");
const errorHandler = require("./middleware/errorHandler");
const dotenv =require("dotenv").config() 
const cors =require("cors")

const app = express()


app.use(express.json())
app.use(cors())
app.use(`/api/contact`,require("./Route/ContactRoute"))
app.use("/api/user",require("./Route/userRoute"))
app.use(errorHandler)


const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`server is listing ${port}`)
})

connectDB()
