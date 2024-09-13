import React, { useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTutorial } from '../redux/tutorialsSlice';

const AddTutorial = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [tags, setTags] = useState(''); // Initialize tags as an empty string for input

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.tutorials.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert tags input (comma-separated) into an array
    const tagsArray = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const tutorialData = {
      title,
      description,
      video_url: videoUrl,
      tags: tagsArray, // Send tags as an array
    };

    dispatch(addTutorial(tutorialData))
      .unwrap() // Ensure proper error handling with createAsyncThunk
      .then(() => {
        setTitle('');
        setDescription('');
        setVideoUrl('');
        setTags('');
        toast.success('Tutorial added successfully!');
      })
      .catch((error) => {
        toast.error('Failed to add tutorial.');
        console.error('Error adding tutorial:', error);
      });
  };

  return (
    <>
      <h2 className="text-center">Add Tutorial</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-column px-6 py-3 border-round-xl m-4 justify-content-between surface-50"
      >
        <div className="mb-5">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="h-3rem text-xs md:text-base text-color bg-tint-5 p-3 border-1 border-solid border-400 border-round-lg appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div className="mb-5">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="h-3rem text-xs md:text-base text-color bg-tint-5 p-3 border-1 border-solid border-400 border-round-lg appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div className="mb-5">
          <label>YouTube Video URL</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=example"
            required
            className="h-3rem text-xs md:text-base text-color bg-tint-5 p-3 border-1 border-solid border-400 border-round-lg appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div className="mb-5">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)} // Update tags value
            placeholder="e.g., gardening, plants, beginners"
            className="h-3rem text-xs md:text-base text-color bg-tint-5 p-3 border-1 border-solid border-400 border-round-lg appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div className="mb-5">
          <button
            type="submit"
            className="bg-primary border-round-lg border-none p-3 h-3rem text-xs md:text-base w-full flex align-items-center justify-content-center cursor-pointer"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <Loading type="spin" color="#fff" height={15} width={15} />
            ) : (
              'Add Tutorial'
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTutorial;
