const express=require("express");
const app=express();
const clientroutes=require('./routes/uploadRoutes');
app.use(express.json());
app.use("/client",clientroutes);


app.listen(3099)
console.log("server is running at port number 3099");