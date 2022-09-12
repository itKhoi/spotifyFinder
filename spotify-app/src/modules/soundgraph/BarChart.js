import React from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

export default function BarChart({chartData}) {
  return (
    <div>
        {chartData.labels ? <Bar data={chartData} /> : <p>ERROR</p>}
    </div>
  )
}
