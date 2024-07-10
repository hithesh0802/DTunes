const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for audio files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

// Multer configuration with storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload;
