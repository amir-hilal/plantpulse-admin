import React from 'react';

const TutorialCard = ({ tutorial }) => {
  return (
    <div className="col-12 md-4 lg-3 sm-12 mb-3">
      <div className="card shadow-2 card-body">
        <img src={tutorial.thumbnail_url} alt={tutorial.title} className="fluid" />
        <h4 className="text-center">{tutorial.title}</h4>
        <p className="text-center">{tutorial.description}</p>
      </div>
    </div>
  );
};

export default TutorialCard;
