import React, { useState } from 'react';
import axios from 'axios';

const UploadSong = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const API_URL= 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('songFile', file);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('duration', duration);

    try {
      await axios.post(`${API_URL}/songs/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Song uploaded successfully');
      // Reset form fields after successful upload
      setFile(null);
      setTitle('');
      setArtist('');
      setDuration('');
    } catch (err) {
      console.error(err);
      alert('Failed to upload song');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
      <input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadSong;