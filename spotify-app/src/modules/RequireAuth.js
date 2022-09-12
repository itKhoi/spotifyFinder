import React from 'react'
import {Navigate} from "react-router-dom"

export default function RequireAuth({children}) {
    const isAuthenticated = localStorage.getItem("token")
    // const navigate = useNavigate()
  return (
    isAuthenticated ? {...children} : <Navigate replace to="/"/>
  )
}