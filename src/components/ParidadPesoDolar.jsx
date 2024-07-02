import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ParidadPesoDolar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(' https://v6.exchangerate-api.com/v6/2d0a6beba11122cfd2fdd830/latest/USD')
      .then(response => {
        const pesoToDollar = response.data.conversion_rates.MXN;
        setData([pesoToDollar, 1]); 
      })
      .catch(error => console.error('Error al obtener la paridad peso/dólar', error));
  }, []);

  return (
    <div>
      <h2>Paridad Peso/Dólar</h2>
      <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
        <Doughnut
          data={{
            labels: ['Peso Mexicano', 'Dólar Estadounidense'],
            datasets: [{
              label: 'Paridad Peso/Dólar',
              data: data,
              backgroundColor: ['red', 'blue'],
              borderColor: ['red', 'blue'],
              borderWidth: 1
            }]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { 
                position: 'top',
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
                text: 'Paridad Peso/Dólar',
                font: {
                  size: 18,
                  family: 'Arial'
                },
                color: '#333'
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default ParidadPesoDolar;
