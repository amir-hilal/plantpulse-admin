import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteTutorial } from '../redux/tutorialsSlice';
import ConfirmationModal from './ConfirmationModal';

const TutorialCard = ({ tutorial }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const dispatch = useDispatch();

  // Toggles the popover for the ellipsis menu
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  // Format views into K and M
  const formatViews = (views) => {
    const numViews = parseInt(views);
    if (numViews >= 1000000) {
      return `${(numViews / 1000000).toFixed(1)}M`;
    } else if (numViews >= 1000) {
      return `${(numViews / 1000).toFixed(1)}K`;
    }
    return views;
  };

  const formatDuration = (duration) => {
    if (!duration) {
      return 'N/A'; // Return 'N/A' or any default value if duration is undefined or invalid
    }

    const parts = duration.split(':');
    if (parts.length === 3 && parts[0] === '00') {
      return `${parts[1]}:${parts[2]}`; // Only minutes and seconds
    }
    return duration; // Keep original format if hours are present
  };

  // Handles copying the YouTube link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(tutorial.video_url);
    toast.success('YouTube video link copied to clipboard!');
    setShowPopover(false);
  };

  // Redirects to the YouTube video
  const handleViewPost = () => {
    window.open(tutorial.video_url, '_blank');
  };

  // Opens the delete confirmation modal
  const handleDelete = (tutorial) => {
    setItemToDelete(tutorial);
    setIsModalOpen(true);
  };

  // Closes the confirmation modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  // Confirms the delete action and dispatches it to Redux
  const handleConfirmDelete = () => {
    dispatch(deleteTutorial(itemToDelete.id));
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="col-12 md:col-4 lg:col-3 md:m-3 cursor-pointer">
      <div>
        {/* Display YouTube Thumbnail */}
        <div className="relative mb-1">
          <img
            src={tutorial.thumbnail_url}
            alt={tutorial.title}
            onClick={handleViewPost}
            className="w-full border-round-xl"
          />
          <p className="absolute right-0 bottom-0 text-xs border-round-md surface-50 p-1 mr-1">
            {formatDuration(tutorial.duration)}
          </p>
        </div>

        {/* Tutorial Information */}
        <div className="flex justify-content-between align-items-center">
          <h4
            className="text-left font-light m-0 text-base p-0 flex align-items-center "
            onClick={handleViewPost}
          >
            <strong>{tutorial.title}</strong>
          </h4>
          <div className="relative flex align-items-center">
            <FaEllipsisH
              className="text-grey cursor-pointer rotate-90"
              onClick={togglePopover}
            />
            {showPopover && (
              <div className="absolute right-0 top-100 surface-100 border-round shadow-2 p-2 w-8rem">
                <button
                  className="text-sm p-2 border-none bg-transparent cursor-pointer hover:bg-primary-reverse text-left"
                  onClick={handleCopyLink}
                >
                  Copy YouTube Link
                </button>
                <button
                  className="text-sm p-2 border-none bg-transparent cursor-pointer hover:bg-primary-reverse"
                  onClick={() => handleDelete(tutorial)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Tutorial Details */}
        <div className="text-left mt-2">
          <p className="text-xs text-grey m-0">
            {formatViews(tutorial.views)} views
          </p>
        </div>
      </div>

      {/* Confirmation Modal for Deleting a Tutorial */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the tutorial titled "${tutorial.title}"?`}
      />
    </div>
  );
};

export default TutorialCard;
