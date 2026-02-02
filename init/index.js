// WARNING: This script clears the database and inserts test data.
// Only run in development, never in production.

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/VoyageHomes";

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "697af79c1b8db9794ed61a65",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};
initDB();
