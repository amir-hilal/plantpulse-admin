import React, { useState } from 'react';

const AddTutorial = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [tags, setTags] = useState([]);

  const handleAddTutorial = (e) => {
    e.preventDefault();
    // Handle submission of form to backend API
    console.log({ title, description, videoUrl, thumbnailUrl, tags });
  };

  return (
    <form onSubmit={handleAddTutorial}>
      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Video URL:</label>
      <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />

      <label>Thumbnail URL:</label>
      <input value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} required />

      <label>Tags (comma-separated):</label>
      <input value={tags} onChange={(e) => setTags(e.target.value.split(','))} />

      <button type="submit">Add Tutorial</button>
    </form>
  );
};

export default AddTutorial;
