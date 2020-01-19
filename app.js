const express=require("express");
const app=express();
const routes=require('./routes/clientRoutes')
app.use(express.json());

app.use('/customer',routes);
app.listen(3099);
console.log("server running at the port number 3099");
