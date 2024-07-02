import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ComparativaBMVSP500 = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      { 
        label: 'BMV', 
        data: [], 
        backgroundColor: 'rgba(0, 255, 0, 0.6)',
        borderColor: 'green', 
        borderWidth: 1 
      },
      { 
        label: 'S&P 500', 
        data: [], 
        backgroundColor: 'rgba(0, 0, 255, 0.6)',
        borderColor: 'blue', 
        borderWidth: 1 
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/bmv_sp500');

        const labels = response.data.dates;
        const bmvValues = response.data.bmv;
        const sp500Values = response.data.sp500;

        setData({
          labels,
          datasets: [
            { ...data.datasets[0], data: bmvValues },
            { ...data.datasets[1], data: sp500Values }
          ]
        });
      } catch (error) {
        console.error('Error al obtener datos para la comparativa', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Comparativa BMV vs S&P 500</h2>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { 
              position: 'bottom', 
              labels: {
                font: {
                  size: 14,
                  family: 'Arial'
                },
                color: '#333'
              }
            },
            title: { 
              display: true, 
              text: 'Comparativa BMV vs S&P 500',
              font: {
                size: 18,
                family: 'Arial'
              },
              color: '#333'
            }
          },
          scales: {
            x: { 
              type: 'category',
              ticks: {
                color: '#333',
                font: {
                  size: 12,
                  family: 'Arial'
                }
              }
            },
            y: { 
              type: 'linear',
              ticks: {
                color: '#333',
                font: {
                  size: 12,
                  family: 'Arial'
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default ComparativaBMVSP500;
