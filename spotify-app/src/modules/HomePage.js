import React from 'react'
import qs from 'qs';
import './HomePage.css'
import {Button, ButtonGroup} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"

export default function HomePage() {
    const RESPONSE_TYPE = "token"
    const AUTH_ENDPOINT= "https://accounts.spotify.com/authorize"
    const REDIRECT_URI="http://localhost:3000"
    const navigate = useNavigate()

    const logout = () =>{
        setToken("")
        window.localStorage.setItem("token","")
    }

    const [token,setToken] = useState("")
    useEffect(()=>{
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        if(!token && hash){
            token = hash.substring(1).split("&").find(elem=>elem.startsWith("access_token")).split("=")[1]
            window.location.hash=""
            window.localStorage.setItem("token",token)
        }
        setToken(token)
        // console.log(token)
    })

  return (
    <div className="home-page-container">
        <div className="home-content-container">
            <h1>
                Spotify Finder
            </h1>
            <div className="home-button">
                
                {
                !token &&
                <a className="login-button" href={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read+playlist-read-private+user-library-read+playlist-read-collaborative+playlist-modify-public`}>
                    <Button variant="primary">Login</Button>
                 </a> 
                }

                {token && 
                <Button variant="primary" onClick={logout}>Log out</Button>
                }
                
                {/* <a href={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                    Click here
                </a> */}
            </div>
            {token && 
            <ButtonGroup className="option-buttons">
                <Button style={{backgroundColor:'rgba(77,185,64,0.9)'}} onClick={()=>{navigate('/profile')}} >Profile</Button>
                <Button style={{backgroundColor:'rgba(173,233,165,0.9)', color: 'black'}} onClick={()=>{navigate('/playlist')}}>Play List Fix</Button>
                <Button style={{backgroundColor:'rgba(80,128,74,0.9)'}}>TBD</Button>
            </ButtonGroup>
            }
        </div>
    </div>
  )
}
