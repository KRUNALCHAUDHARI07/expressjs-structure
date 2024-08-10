const dotenv = require("dotenv");
const { mongoose } = require("./constants");

dotenv.config();
const user = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

//connect database
const connectDb = mongoose
  .connect(
    `mongodb+srv://${user}:${password}@cluster0.vfcil.mongodb.net/${database}`
  )
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log("error: ", error);
    console.log("database connection error 123");
  });

module.exports = connectDb;
