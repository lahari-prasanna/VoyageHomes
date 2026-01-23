const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ejsMate = require("ejs-mate");

//Routes Handling
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

let MONGO_URL = "mongodb://127.0.0.1:27017/VoyageHomes";

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Root is working");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

//Error Handling Middlewares
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("Error.ejs", { message });
});

app.listen(8080, (req, res) => {
  console.log("listening to port 3000");
});
