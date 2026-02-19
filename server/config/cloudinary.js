const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a file to Cloudinary
 * @param {string} filePath - Local file path or base64 string
 * @param {Object} options - Optional parameters (folder, public_id, format)
 * @returns {Promise<Object>} - Cloudinary upload response
 */
const uploadToCloudinary = async (filePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    return result; // Contains url, public_id, secure_url, etc.
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

/**
 * Deletes an image from Cloudinary by public_id
 * @param {string} publicId
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw error;
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
};
