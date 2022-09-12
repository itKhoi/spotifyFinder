import React from 'react'

export default function Song(props) {
  return (
    <div>
        {props.idx}. {props.track.name}
    </div>
  )
}
