
require("dotenv").config()
const {connectDB}  =  require("./db")
const express =  require("express")
const app =  express()
const cors = require('cors');
const path  =  require("path") 
app.use(cors());
app.use(express.json())

const authRouter =  require("./Routes/auth")

connectDB()



app.use("/api" , authRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/" ,   (req , res)=>{
    res.send("Hello World")
})




const PORT = process.env.PORT ||  8080; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
