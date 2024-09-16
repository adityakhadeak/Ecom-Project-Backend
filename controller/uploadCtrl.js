const { cloudinaryUploadImg, cloudinaryDeleteImg } = require("../utils/cloudinary");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

// Direct image upload to Cloudinary
const uploadImages = asyncHandler(async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const files = req.files.images; // Assuming "images" is the name of the file input from frontend

    const urls = [];
    
    // If only one file is uploaded, make it an array for consistency
    const fileArray = Array.isArray(files) ? files : [files];

    for (const file of fileArray) {
      // Convert file buffer to base64
      const base64File = file.data.toString('base64');
      const base64Image = `data:${file.mimetype};base64,${base64File}`;

      // Upload to Cloudinary
      const uploadResult = await cloudinaryUploadImg(base64Image);
      urls.push(uploadResult);
    }

    res.json(urls); // Return the uploaded image URLs
  } catch (error) {
    res.status(500);
    throw new Error("Image upload failed.");
  }
});

// Delete image from Cloudinary
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryDeleteImg(id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500);
    throw new Error("Image deletion failed.");
  }
});

module.exports = { uploadImages, deleteImages };
