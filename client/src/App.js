import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageUrl(null); // Clear previous image when a new file is selected
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
    setVideoUrl(null); // Clear previous video when a new file is selected
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.post('http://localhost:6001/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageUrl(response.data.imageUrl);
      alert('Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('Error uploading image.');
    }
  };

  const handleVideoUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);

      const response = await axios.post('http://localhost:6001/upload/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setVideoUrl(response.data.videoUrl);
      alert('Video uploaded successfully.');
    } catch (error) {
      console.error('Error uploading video:', error.message);
      alert('Error uploading video.');
    }
  };

  return (
    <div className="App">
      <h2>Image Upload</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={`http://localhost:6001${imageUrl}`} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}

      <h2>Video Upload</h2>
      <input type="file" onChange={handleVideoChange} />
      <button onClick={handleVideoUpload}>Upload Video</button>

      {videoUrl && (
        <div>
          <h3>Uploaded Video:</h3>
          <video controls width="100%">
            <source src={`http://localhost:6001${videoUrl}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default App;
