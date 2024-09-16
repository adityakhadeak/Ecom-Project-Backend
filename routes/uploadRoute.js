const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

// Update product image upload route to directly handle Cloudinary uploads
router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadImages // Updated to handle direct Cloudinary upload
);

router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;