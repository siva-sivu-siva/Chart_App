import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import './index.css'
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { enUS } from 'date-fns/locale';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateData = (timeframe) => {
  switch (timeframe) {
    case 'daily':
      return [
        { x: '2023-01-01T00:00:00Z', y: 30 },
        { x: '2023-01-02T00:00:00Z', y: 40 },
        { x: '2023-01-03T00:00:00Z', y: 35 },
        { x: '2023-01-04T00:00:00Z', y: 37 },
        { x: '2023-01-05T00:00:00Z', y: 43 },
        { x: '2023-01-06T00:00:00Z', y: 31 },
        { x: '2023-01-07T00:00:00Z', y: 24 },
        { x: '2023-01-08T00:00:00Z', y: 12 },
        { x: '2023-01-09T00:00:00Z', y: 39 },
      ];
    case 'weekly':
      return [
        { x: '2023-01-01T00:00:00Z', y: 30 },
        { x: '2023-01-08T00:00:00Z', y: 45 },
        { x: '2023-01-15T00:00:00Z', y: 50 },
        { x: '2023-01-22T00:00:00Z', y: 23 },
        { x: '2023-01-29T00:00:00Z', y: 14 },
        { x: '2023-02-04T00:00:00Z', y: 39 },
      ];
    case 'monthly':
      return [
        { x: '2023-01-01T00:00:00Z', y: 30 },
        { x: '2023-02-01T00:00:00Z', y: 20 },
        { x: '2023-03-01T00:00:00Z', y: 40 },
        { x: '2023-04-01T00:00:00Z', y: 35 },
        { x: '2023-05-01T00:00:00Z', y: 59 },
        { x: '2023-06-01T00:00:00Z', y: 81 },
      ];
    default:
      return [];
  }
};

const TimeChart = () => {
  const [timeframe, setTimeframe] = useState('daily');
  const data = {
    datasets: [
      {
        label: 'Sample Data',
        data: generateData(timeframe),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeframe === 'daily' ? 'day' : timeframe === 'weekly' ? 'week' : 'month',
          tooltipFormat: 'MM/dd/yyyy',
          displayFormats: {
            day: 'MM/dd/yyyy',
            week: 'MM/dd/yyyy',
            month: 'MM/yyyy',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div>
      <div>
        <label className='time-frame-heading' htmlFor="timeframe-select">Select Timeframe:</label>
        <select className='time-frame-option' id="timeframe-select" onChange={(e) => setTimeframe(e.target.value)} value={timeframe}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default TimeChart;
