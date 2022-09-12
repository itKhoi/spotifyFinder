import React from 'react'
import {useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import TopArtists from './TopArtists'

export default function 
Profile() {
    const navigate = useNavigate()
    const [token,setToken] = useState(window.localStorage.getItem("token"))
    const [myProfile, setMyProfile] = useState({profileName:'', profilePic:''})
    const [topArtists, setTopArtists] = useState([])
    // console.log(token)
    useEffect(()=>{
      const fetchData = async () =>{
        // get user profile
        const dataOne = await axios.get('https://api.spotify.com/v1/me',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
                      }
            }
        )
        // get top songs
        const dataTwo = await axios.get('https://api.spotify.com/v1/me/top/artists',
          {
            headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            params:{
              limit: 8,
              time_range: 'short_term'
            }
          })
        setMyProfile({
          profileName: dataOne.data.display_name,
          profilePic: dataOne.data.images[0].url
        })
        // console.log(myProfile)
        setTopArtists(dataTwo.data.items)
        // console.log(topArtists)
        }
        fetchData()
        // console.log(topArtists)
    },[])
    console.log(topArtists)
  return (
    <div>
        <h1>Profile</h1>
        <p>{myProfile.profileName}</p>
        <img src={myProfile.profilePic}></img>
        <Button variant="primary" onClick={()=>{navigate("/")}}>Go back</Button>
        {/* {topArtists.map((help,idx)=>(
          <TopArtists key={idx} name={help.name} pic={help.images[0].url}/>
        ))} */}
        <TopArtists items={topArtists}/>
    </div>
  )
}
