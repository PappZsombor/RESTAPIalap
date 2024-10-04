// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const shopRoutes = require("./routes/shop");

// mongoose.set("strictQuery", true);
// const connString = process.env.DATABASE_URL;

// mongoose.connect(connString);

// const database = mongoose.connection;

// database.on("error", (error) => {
//   console.log(error);
// });

// database.once("connected", () => {
//   console.log("Database connected");
// });

// const app = express();
// app.use(express.json());
// app.use("/api", shopRoutes);

// app.listen(3000, () => {
//   console.log(`Server started at ${3000}`);
// });

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const restaurantRoutes = require("./routes/restaurants");

mongoose.set("strictQuery", true);
const connString = process.env.DATABASE_URL;

mongoose.connect(connString);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database connected");
});

const app = express();
app.use(express.json());
app.use("/api", restaurantRoutes);

app.listen(8000, () => {
  console.log(`Server started at ${8000}`);
});
