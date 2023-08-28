require("dotenv").config();
require("express-async-errors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
// USE V2
const cloudinary = require("cloudinary").v2;
// import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: "dlhyprhhx",
  api_key: "627923273166732",
  api_secret: "yaqhys2c7AVBIQcXTXktShB3MK4",
});
// database
const connectDB = require("./db/connect");

// product router
const productRouter = require("./routes/productRoutes");
const userRoutes = require("./routes/auth");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(cookieParser("secret"));
// app.use(express.static("./public"));

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRouter);
// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
