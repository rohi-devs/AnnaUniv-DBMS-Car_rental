import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from "axios";

const Dashboard = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_car_branch_count');
        const data = response.data;
          console.log(data);
        const chartLabels = data.map((item) => item[0]);
        const chartValues = data.map((item) => item[1]);
          ChartJS.register(
              CategoryScale,
              LinearScale,
              PointElement,
              LineElement,
              Title,
              Tooltip,
              Filler,
              Legend
        );


        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: 'Car rented from the branch',
              data: chartValues,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 3,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }


    };




    fetchData();
  }, []);

 const chartOptions  = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Chart.js Line Chart"
    }
  }
};


  return (
      <div>
          {Object.keys(chartData).length !== 0 ? (
              <Line data={chartData} options={chartOptions}/>
          ) : (
              <p>Loading...</p>
          )}
      </div>
  );
};

export default Dashboard;

