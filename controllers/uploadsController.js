const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Product = require("../models/Product");

const uploadProductImage = async (req, res) => {
  const { name, Catagory, subCatagory, description, email } = req.body;
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  const product = await Product.create({
    name,
    email,
    Catagory,
    subCatagory,
    description,
    image: result.secure_url,
  });
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "created sucessfully." });
};

const getAllProduct = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json(products);
};

module.exports = {
  uploadProductImage,
  getAllProduct,
};
