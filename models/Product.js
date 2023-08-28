const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    Catagory: {
      type: String,
      // enum: ["blocKchain", "crypto", "stock"],
      // default: "blocKchain",
    },
    subCatagory: {
      type: String,
    },
    description: {
      type: String,
      maxlength: 150,
      minlength: 20,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
