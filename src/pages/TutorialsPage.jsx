import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tutorials')
      .then(response => {
        setTutorials(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tutorials:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid justify-content-center mt-4">
      <div className="col-12">
        <h2 className="text-center">Gardening Tutorials</h2>
      </div>
      <div className="col-12 grid justify-content-between">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="col-12 md-4 lg-3 sm-12 mb-3">
            <div className="card shadow-2 card-body">
              <img src={tutorial.thumbnail_url} alt={tutorial.title} className="fluid" />
              <h4 className="text-center">{tutorial.title}</h4>
              <p className="text-center">{tutorial.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
