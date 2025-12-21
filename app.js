const express=require('express');
const app= express();
const mongoose=require('mongoose');
const path=require('path');
const Listing=require('./models/listing.js');



app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");


let MONGO_URL="mongodb://127.0.0.1:27017/VoyageHomes";

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

app.get("/testListings",(req,res)=>{
    let sampleListing=new Listing({
        title:"My new Villa",
        description:"Nearby beach",
        price:200,
        location:"AP",
        Country:"India"
    })
    sampleListing.save()
        .then(()=>{
            console.log("listing saved");
        })
        .catch((err)=>{
            console.log(err);
        })
    res.send("tested successfully");
})

app.listen(8080,(req,res)=>{
    console.log("listening to port 8080");
})