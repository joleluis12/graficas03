import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const IndicadoresBMV = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=LJQ7B7NZE43XL7P6')
      .then(response => {
        const timeSeries = response.data['Time Series (Daily)'];
        const labels = Object.keys(timeSeries).reverse();
        const values = labels.map(date => timeSeries[date]['4. close']).reverse();
        setData({
          labels,
          datasets: [
            {
              label: 'Indicadores BMV',
              data: values,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
              tension: 0.4 
            }
          ]
        });
      })
      .catch(error => console.error('Error al obtener indicadores de la BMV', error));
  }, []);

  return (
    <div>
      <h2>Indicadores de la BMV</h2>
      <div style={{ width: '800px', height: '500px', margin: '0 auto' }}>
        <Line
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
                text: 'Indicadores de la BMV',
                font: {
                  size: 18,
                  family: 'Arial'
                },
                color: '#333'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.raw);
                    return label;
                  }
                }
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
                  },
                  callback: function(value) {
                    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default IndicadoresBMV;
