import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register the necessary components with ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
 
  const [chartData, setChartData] = useState({});

  const monthMapping = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
 
  useEffect(() => {
    console.log(localStorage.getItem('company_id'))
    const fetchData = async () => {
      try {
        const response = await axios.get('http://13.201.248.202:3001/api/main/imagecount', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'x-company_id': localStorage.getItem('company_id') // Dummy company ID
            // 'company_id':'66ea4b29b58533111607ac00'
           
          }
        });

        
        const imageCounts = Array(12).fill(0);

       
        if (response.data.data) {
          response.data.data.forEach(record => {
            const monthIndex = monthMapping[record.month]; 
            if (monthIndex !== undefined) {
              imageCounts[monthIndex] = record.totalImagesProcessed; 
            }
          });
        }

        
        setChartData({
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Images Processed',
              data: imageCounts,  
              backgroundColor: 'rgba(75, 192, 192, 0.6)',  
              borderColor: 'rgba(75, 192, 192, 1)',       
              borderWidth: 1,
             
            },
          ],
        });
      } catch (error) {
        console.log('*********** Error while fetching data ***********', error);
      }
    };

    fetchData();
  }, []);



  // Default chart data and options if data is still loading
  const defaultData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Images Processed',
        data: Array(12).fill(0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'white',       // Border color
        borderWidth: 2,
        color:'white',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Image Processed Data',
        color: 'white',
    
      },
    },
  };

  return <Bar data={chartData.labels ? chartData : defaultData} options={options} />;
};

export default BarChart;
