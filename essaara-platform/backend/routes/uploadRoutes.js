const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Endpoint
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided' });
    }

    const fileBuffer = req.file.buffer;
    const base64Image = fileBuffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

    cloudinary.uploader.upload(dataURI, { folder: 'essaara' }, (error, result) => {
      if (error) {
        console.error('Cloudinary Upload Error:', error);
        return res.status(500).json({ message: 'Failed to upload image' });
      }
      res.status(200).json({
        message: 'Upload successful',
        imageUrl: result.secure_url,
      });
    });
  } catch (error) {
    console.error('Upload Route Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
