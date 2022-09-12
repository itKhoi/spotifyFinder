import React from 'react'
import './TopArtists.css'

export default function TopArtists(props) {
  return (
    <div>
        <div className='artist-card-container'>
            {props.items.map((artist,idx)=>(
                <div className='artist-card'>
                  <img src={artist.images[0].url}></img>
                  <p>{idx+1}. {artist.name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}
