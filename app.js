const express=require('express');
const app= express();
const mongoose=require('mongoose');
const path=require('path');



app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");


let MONGO_URL="mongodb://127.0.0.1:27017/WanderLust";

main()
    .then(()=>{
        console.log("connection successful");
    })
    .catch(err => console.log(err));


async function main(){
    await mongoose.connect(MONGO_URL);
}



app.get("/",(req,res)=>{
    res.send("Root is working");
})


app.listen(8080,(req,res)=>{
    console.log("listening to port 8080");
})