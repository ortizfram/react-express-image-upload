// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());

// Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Multer upload instance
const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Handling image upload route
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Assuming 'uploads' is the destination folder
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl: imageUrl });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
