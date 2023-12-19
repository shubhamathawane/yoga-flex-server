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

const authRoute = require("./routes/Auth.js");
const batchRoute = require("./routes/Batch.js");
const paymentRoute = require('./routes/Payment');
const userRoute = require('./routes/UpdatedUser');
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
app.use("/api/payment", paymentRoute)
app.use("/api/user", userRoute)
app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
