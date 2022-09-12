import React from 'react'
import { useState, useEffect } from 'react'
import {Bar} from "react-chartjs-2"
import BarChart from './BarChart'
import './ProgressBar.css'

export default function ProgressBar(props) {
    const [features, setFeatures] = useState({});
    const [chartData, setChartData] = useState({})
    useEffect(()=>{
        setFeatures(props.audioFeatures)
    },[props.audioFeatures])
    useEffect(()=>{
        const createGraph = () => {
            setChartData({
                labels: Object.entries(features).map(([key,value])=>key),
                datasets: [
                    {
                        indexAxis: 'y',
                        label: "Audio Features",
                        data: Object.entries(features).map(([key,value]) => value),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                            // 'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                            // 'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            })
        }
        createGraph()
    },[features])
  return (
    <div>
        {<BarChart chartData={chartData}/>}
    </div>
  )
}
