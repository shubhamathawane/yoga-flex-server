const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const seedInitialBatchData = require("./utils/Seed");

dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const mongo_url = process.env.MONGO_URL;

const authRoute = require("./routes/AuthRoute.js");
const batchRoute = require("./routes/BatchRoute.js");
// mongoose connection

mongoose
  .connect(mongo_url, {
    config: { autoIndex: true },
  })
  .then(() => {
    console.log("Database Connected!"), seedInitialBatchData();
  })
  .catch((err) => console.log(err));

// user authentication
app.use("/api/auth", authRoute);
app.use("/api/batch", batchRoute);

app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
