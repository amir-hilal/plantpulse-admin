import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TutorialCard = ({ tutorial }) => {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };
  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/tutorials/${tutorial.id}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Tutorial link copied to clipboard!');
    setShowPopover(false);
  };

  const handleViewPost = () => {
    navigate(`/tutorials/${tutorial.id}`);
  };

  const handleDelete = (post) => {
    // setItemToDelete(post); // Set the item you want to delete
    setIsModalOpen(true);
  };

  return (
    <div onClick={handleViewPost} className="col-12 md:col-4 lg:col-3 md:m-3">
      <div>
        <img
          src={tutorial.thumbnail_url}
          alt={tutorial.title}
          className="w-full border-round-xl"
        />
        <div className='flex'>
          <h4 className="text-left font-light m-0 mt-2 text-base">
            {tutorial.title}
          </h4>
          <div className="relative flex align-items-center">
            <FaEllipsisH
              className="text-grey cursor-pointer rotate-90"
              onClick={togglePopover}
            />
            {showPopover && (
              <div className="absolute  right-0  top-100 surface-100  border-round shadow-2 p-2  w-8rem">
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
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete?`}
      />
    </div>
  );
};

export default TutorialCard;
