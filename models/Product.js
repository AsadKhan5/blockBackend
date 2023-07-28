const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    Catagory: {
      type: String,
      enum: ["blocKchain", "crypto", "stock"],
      default: "blocKchain",
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
