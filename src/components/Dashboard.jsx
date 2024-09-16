import 'chart.js/auto'; // This is required for Chart.js to work
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import api from '../services/api'; // Import the axios instance

const Dashboard = () => {
  const [data, setData] = useState({
    totalTutorials: 0,
    totalViews: 0,
    totalPlants: 0,
    totalUsers: 0,
    totalPosts: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/admin/dashboard/stats');
        setData({
          totalTutorials: response.data.tutorials,
          totalViews: response.data.views,
          totalPlants: response.data.plants,
          totalUsers: response.data.users,
          totalPosts: response.data.posts,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load dashboard data.');
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Plants', 'Users', 'Tutorials', 'Posts'],
    datasets: [
      {
        label: 'System Stats',
        data: [
          data.totalPlants,
          data.totalUsers,
          data.totalTutorials,
          data.totalPosts,
        ],
        backgroundColor: [
          'rgba(1, 148, 68, 0.8)', // Primary color
          'rgba(38, 50, 56, 0.8)', // Secondary color
          'rgba(33, 150, 243, 0.8)', // Info color
          'rgba(255, 99, 132, 0.8)', // Custom color
        ],
        borderColor: [
          'rgba(1, 148, 68, 1)',
          'rgba(38, 50, 56, 1)',
          'rgba(33, 150, 243, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 2000, // Cool animation duration
      easing: 'easeInOutBounce', // Animation easing effect
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(1, 148, 68, 1)', // Color for y-axis ticks
        },
        grid: {
          color: 'rgba(1, 148, 68, 0.3)', // Gridline color
        },
      },
      x: {
        ticks: {
          color: 'rgba(38, 50, 56, 1)', // Color for x-axis ticks
        },
        grid: {
          color: 'rgba(38, 50, 56, 0.3)', // Gridline color
        },
      },
    },
  };

  return (
    <div
      className=" p-5 text-white mx-6 flex justify-content"
      style={{ borderRadius: 'var(--border-radius)' , height:'75vh'}}
    >
      <div style={{ height: '80%'}}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
