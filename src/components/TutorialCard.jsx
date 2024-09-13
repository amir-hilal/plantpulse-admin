import React from 'react';

const TutorialCard = ({ tutorial }) => {
  return (
    <div className="col-12 md:col-4 lg:col-3 mb-3">
      <div className="shadow-2 p-3">
        <img src={tutorial.thumbnail_url} alt={tutorial.title} className="w-full mb-2" />
        <h4 className="text-center">{tutorial.title}</h4>
        <p className="text-center">{tutorial.description}</p>
      </div>
    </div>
  );
};

export default TutorialCard;
