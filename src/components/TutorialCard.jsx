import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteTutorial } from '../redux/tutorialsSlice';
import ConfirmationModal from './ConfirmationModal';

const TutorialCard = ({ tutorial }) => {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const dispatch = useDispatch();

  // Toggles the popover for the ellipsis menu
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  // Handles copying the tutorial link
  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/tutorials/${tutorial.id}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Tutorial link copied to clipboard!');
    setShowPopover(false);
  };

  // Navigates to the tutorial detail page
  const handleViewPost = () => {
    navigate(`/tutorials/${tutorial.id}`);
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
        <img
          src={tutorial.thumbnail_url}
          alt={tutorial.title}
          onClick={handleViewPost}
          className="w-full border-round-xl"
        />

        {/* Tutorial Information */}
        <div className="flex justify-content-between">
          <h4
            className="text-left font-light m-0 mt-2 text-base"
            onClick={handleViewPost}
          >
            {tutorial.title}
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
                  Copy Post Link
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
          <p className="text-sm">
            <strong>Views:</strong> {tutorial.views}
          </p>
          <p className="text-sm">
            <strong>Duration:</strong> {tutorial.duration}
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
