import React, { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DashboardCharts = () => {
  const [donutChartData, setDonutChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/main/imagecount', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'x-company_id': localStorage.getItem('company_id'),
          },
        });

        const imageCounts = Array(12).fill(0);

        if (response.data && response.data.data) {
          response.data.data.forEach((record) => {
            const monthIndex = new Date(`${record.month} 1`).getMonth();
            if (monthIndex !== undefined) {
              imageCounts[monthIndex] = record.totalImagesProcessed;
            }
          });
        }

        // Donut chart data
        setDonutChartData({
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Images Processed',
              data: imageCounts,
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#FF6384', '#36A2EB',
                '#FFCE56', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB', '#FFCE56',
              ],
              hoverBackgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#FF6384', '#36A2EB',
                '#FFCE56', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB', '#FFCE56',
              ],
              borderWidth: 1,
            },
          ],
        });

        // Bar chart data
        setBarChartData({
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Images Processed',
              data: imageCounts,
              backgroundColor: '#3F51B5',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="dashboard-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        padding: '20px',
        justifyItems: 'center',
      }}
    >
      {/* Donut Chart Card */}
      <div
        className="card shadow-sm"
        style={{
          width: '400px', // Uniform width
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          className="card-header"
          style={{
            backgroundColor: '#17a2b8',
            color: '#fff',
            textAlign: 'center',
            padding: '10px',
          }}
        >
          <h6 style={{ margin: 0 }}>Image Processing Statistics</h6>
        </div>
        <div
          className="card-body"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          {donutChartData ? (
            <div style={{ height: '300px', width: '300px' }}>
              <Doughnut data={donutChartData} />
            </div>
          ) : (
            <p>Loading Donut Chart...</p>
          )}
        </div>
      </div>

      {/* Bar Chart Card */}
      <div
        className="card shadow-sm"
        style={{
          width: '1050px', // Uniform width
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          className="card-header"
          style={{
            backgroundColor: '#6c757d',
            color: '#fff',
            textAlign: 'center',
            padding: '10px',
          }}
        >
          <h6 style={{ margin: 0 }}>Monthly Images Processed</h6>
        </div>
        <div
          className="card-body"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            height: '300px', // Prevent overflow of bar chart
          }}
        >
          {barChartData ? (
            <div style={{ width: '1050px', height: '250px' }}>
              <Bar data={barChartData} options={barOptions} />
            </div>
          ) : (
            <p>Loading Bar Chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
