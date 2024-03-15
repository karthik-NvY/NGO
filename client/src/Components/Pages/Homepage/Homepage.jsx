import React from 'react'
import './Homepage.css'
import NavBar from '../Dashboard/NavBar/NavBar'

const Homepage = () => {
  return (
    <div className="home">
        <NavBar/>
        <div className="websites">
        <h1>NGO Websites</h1>
        </div>
        <div className="build">
            <p>Wanna add your website</p>
            <button>Build your own website</button>
        </div>
    </div>
  )
}

export default Homepage;