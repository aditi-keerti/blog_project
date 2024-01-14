const express = require ("express");
const {connection} = require('./db');
const {userRoute} = require("./routes/user.routes");
const {blogRoute}=require("./routes/blog.routes")
const cors=require("cors")


const app = express();

app.use(express.json());
app.use(cors({ 
    origin: 'http://127.0.0.1:5500', // Adjust with your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}))
app.use("/users",userRoute);
app.use("/blogs",blogRoute)
app.get("/",(req,res)=>{
    res.send("home page")
})


const PORT = 8085;

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server is running on PORT ${PORT}`);
        console.log("Connected to the database");
    } catch (err) {
        console.error("Error starting the server:", err);
    }
});
