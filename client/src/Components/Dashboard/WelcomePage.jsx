import React from 'react';
import './WelcomePage.css';
import HomePageLogo from "./Assets/HomePageLogo.png";
import { Link } from 'react-router-dom'

function WelcomePage() {
  return (
    <div>
        <div className="container">
            <div className="nav-bar">
                <div className="logo">
                    <img src={HomePageLogo} alt="Home-page-logo" />
                </div>
                <div className="login-singup">
                  <div className="signup">Sign Up</div>
                  <div className="login">Login</div>
                </div>
                
            </div>


            <div className="main-container">
              <div className="text1">
                "Empower NGOs worldwide with an intuitive website hosting platform, where simplicity meets impact."
              </div>
              <div className="text2">
                From next scroll you'll see template home pages, but our first photo will be related to us
              </div>
            </div>




            {/* About Us */}

            <div className="about-us-container">
              <div className="three-dots">
                <div className="dot dot1"></div>
                <div className="dot dot2"></div>
                <div className="dot dot3"></div>
              </div>
              <div className="about-us">
                About us
              </div>
              <div className="segment">
                <h1>Create a website</h1>
                choose from any of our industry-leading website templates, designer fonts and colour pallets. Share your and services set up an e-commerce store and boodesigner fonts and colour pallets.
              </div>


              <div className="segment">
                <h1>Share your services</h1>
                Advertise what, where, and why you do what you do. Let a volunteer join or donate and contribute to your cause.
              </div>

              <div className="segment3 segment">
                <h1>Market your NGO</h1>
                Social tools make it easy to retain customers and volunteers to grow your base
              </div>

            </div>

            {/* Testimonials Page  */}

            <div className="testimonials">
              <div className="text-testimonials">
                <div>Testimonial</div>
              "Thanks to CauseCraft, our NGO now has a vibrant online home! Creating our website was a breeze with their user-friendly tools and templates. We're thrilled to showcase our mission and connect with supporters worldwide. Highly recommend!"

              </div>
              <div className="circle">

              </div>
            </div>


            <div className="footer-container">
            <div className="part1">
                Connect With Us
            </div>
            <div className="part2">
                <div className="address">
                  Main Office <br />
                  <div>
                  IIT Ropar, <br/>
                  Kotla Nihag, <br/>
                  Punjab, <br/>
                  140001. <br/>
                  </div>
                  
                </div>
                <div className="social-media-address">
                {/* <Link to="https://www.facebook.com">Facebook</Link> */}
                {/* <Link to="https://www.facebook.com">Home</Link> \*/}
                Social Media <br />
                <div>
                Facebook <br/>
                Google <br/>
                Instagram <br/>

                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default WelcomePage