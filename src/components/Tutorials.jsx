import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTutorials } from '../redux/tutorialsSlice';

const Tutorials = () => {
  const dispatch = useDispatch();
  const { tutorials, loading, error } = useSelector((state) => state.tutorials);

  useEffect(() => {
    dispatch(fetchTutorials());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-column">
      <h1 className=" p-0 text-2xl mb-4">Gardening Tutorials</h1>

      {/* Search and filter section */}
      <div className=" flex justify-content-between align-items-center mb-4">
        <div className="flex align-items-center">
          <select className="p-inputtext">
            <option value="">Category</option>
            {/* Add categories here */}
          </select>
        </div>
        <div className="flex align-items-center">
          <input
            type="text"
            className="p-inputtext p-2"
            placeholder="Search for anything"
          />
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="col-12 grid p-0">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="col-12 md:col-6 lg:col-4 mb-4">
            <div className="p-card">
              <img
                src={tutorial.thumbnail_url}
                alt={tutorial.title}
                className="w-full"
              />
              <div className="p-card-content">
                <h3>{tutorial.title}</h3>
                <p>{tutorial.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
