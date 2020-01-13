const express=require("express");
const app=express();
const clientroutes=require('./routes/clientroutes');
app.use(express.json());
const joi=require('joi');

app.use("/client",clientroutes);

app.listen(3092);

console.log("server is running at port number 3092");
// console.log("eyJhbGciOiJIUzI1NiJ9.Mjg.hTH_5JfiWBOWL9od591NCWLXKwFXcrJdgmGuymc9bNQ"=="eyJhbGciOiJIUzI1NiJ9.Mjg.hTH_5JfiWBOWL9od591NCWLXKwFXcrJdgmGuymc9bNQ");


