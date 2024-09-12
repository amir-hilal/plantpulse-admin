import React from 'react';

const Dashboard = () => {
  const [data, setData] = React.useState({
    totalTutorials: 0,
    totalViews: 0
  });

  React.useEffect(() => {
    // Here you would fetch the data from the API
    setData({
      totalTutorials: 10,
      totalViews: 1234
    });
  }, []);

  return (
    <div>
      <p>Total Tutorials: {data.totalTutorials}</p>
      <p>Total Views: {data.totalViews}</p>
    </div>
  );
};

export default Dashboard;
