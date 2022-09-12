import React from 'react'
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
import {Button} from 'react-bootstrap'
import Track from './Track'
import TrackPage from './TrackPage'
import {BrowserRouter,Routes, Route} from "react-router-dom";
import './Playlist.css'

export default function Playlist() {
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState([])
  const [token,setToken] = useState(window.localStorage.getItem("token"))

  useEffect(()=>{
    const fetchPlaylist = async () =>{
      const response = await axios.get('https://api.spotify.com/v1/me/playlists',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': `application/json` 
          },
          params: {
            limit: 50
          }
        }
      )
      setPlaylists(response.data.items)
      console.log(playlists)
    }
    fetchPlaylist()
  },[])
  return (
    <div>
        <h1>Profile</h1>
        <div className='track-grid'> 
          {
            playlists.map((playlist) => (
                <Track id = {playlist.id} name={playlist.name} image={playlist.images[0]}/>
              
            ))
          }
          
        </div>
        <Button variant="primary" onClick={()=>{navigate('/')}}>Go Back</Button>
    </div>
  )
}
