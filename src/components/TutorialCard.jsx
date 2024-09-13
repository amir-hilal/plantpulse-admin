import React from 'react';

const TutorialCard = ({ tutorial }) => {
  return (
    <div className="col-12 md:col-4 lg:col-3 md:m-3">
      <div className="shadow-2 p-3">
        <img src={tutorial.thumbnail_url} alt={tutorial.title} className="w-full" />
        <h4 className="text-left m-0 mt-2 text-base">{tutorial.title}</h4>
      </div>
    </div>
  );
};

export default TutorialCard;
