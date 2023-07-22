const express = require("express");
const router = express.Router();
const {
  uploadProductImage,
  getAllProduct,
} = require("../controllers/uploadsController");

router.route("/").get(getAllProduct);
router.route("/uploads").post(uploadProductImage);

module.exports = router;
