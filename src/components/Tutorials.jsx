import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you'll use react-router

const Tutorials = () => {
  const [tutorials, setTutorials] = React.useState([]);

  React.useEffect(() => {
    // Fetch tutorials data from the API
    setTutorials([
      { id: 1, title: 'Tutorial 1', views: 100 },
      { id: 2, title: 'Tutorial 2', views: 200 }
    ]);
  }, []);

  return (
    <div>
      <button><Link to="/add-tutorial">Add New Tutorial</Link></button>
      <ul>
        {tutorials.map(tutorial => (
          <li key={tutorial.id}>
            <h3>{tutorial.title}</h3>
            <p>Views: {tutorial.views}</p>
            <button><Link to={`/tutorial/${tutorial.id}`}>View</Link></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tutorials;
