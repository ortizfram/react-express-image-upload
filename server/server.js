const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 6001;

app.use(cors());

// Multer storage configuration for images
const imageStorage = multer.diskStorage({
  destination: path.join(__dirname, 'src', 'uploads', 'imgs'),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Multer storage configuration for videos
const videoStorage = multer.diskStorage({
  destination: path.join(__dirname, 'src', 'uploads', 'videos'),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Multer upload instances
const uploadImage = multer({ storage: imageStorage });
const uploadVideo = multer({ storage: videoStorage });

// Serve static files from the 'uploads' directory
app.use('/imgs', express.static(path.join(__dirname, 'src', 'uploads', 'imgs')));
app.use('/videos', express.static(path.join(__dirname, 'src', 'uploads', 'videos')));

// Handling image upload route
app.post('/upload/image', uploadImage.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const imageUrl = `/imgs/${req.file.filename}`;
  res.status(200).json({ imageUrl: imageUrl });
});

// Handling video upload route
app.post('/upload/video', uploadVideo.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const videoUrl = `/videos/${req.file.filename}`;
  res.status(200).json({ videoUrl: videoUrl });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
