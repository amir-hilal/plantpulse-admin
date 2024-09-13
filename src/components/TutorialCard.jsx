import React from 'react';

const TutorialCard = ({ tutorial }) => {
  return (
    <div className="col-12 md:col-4 lg:col-3 md:m-3">
      <div>
        <img src={tutorial.thumbnail_url} alt={tutorial.title} className="w-full border-round-xl" />
        <h4 className="text-left font-light m-0 mt-2 text-base">{tutorial.title}</h4>
      </div>
    </div>
  );
};

export default TutorialCard;
