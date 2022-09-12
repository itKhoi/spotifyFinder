import React from 'react'
import './Track.css'
import {useNavigate} from "react-router-dom"

export default function Track(props) {
    const navigate = useNavigate()
  return (
    <div>
        <div className='track-card' onClick={()=>{navigate(`/playlist/${props.id}`)}}>
            <img src={props.image.url}></img>
            <p>{props.name}</p>
        </div>
    </div>
  )
}
