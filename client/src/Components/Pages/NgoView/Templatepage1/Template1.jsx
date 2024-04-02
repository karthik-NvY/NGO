import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Template1.css";

export const Template1 = () => {
  const [ngo, setNgo] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchNgoData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/ngodata/${match.params.ngoid}`);
        setNgo(response.data);
      } catch (error) {
        console.error("Error fetching NGO data:", error);
      }
    };

    fetchNgoData();
  }, [match.params.ngoid]);

  if (!ngo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="temp1">
      <header>
        <div className="logo">
          <div className="logo">{logo}</div>
          <span className="name">{ngoname}</span>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#Home">Home</a>
            </li>
            <li>
              <a href="#AboutUs">About Us</a>
            </li>
            <li>
              <a href="#Events">Recent Events</a>
            </li>
            <li>
              <a href="#ContactUs">Contact Us</a>
            </li>
          </ul>
        </nav>
      </header>

      <section id="Home" className="hero-section">
        <div className="image-slider-container">
          <div className="image-slider">{data.hero}</div>
        </div>
      </section>

      <section id="AboutUs" className="about-section">
        <div className="about-content">
          <div className="about-heading">
            <h2>ABOUT US</h2>
          </div>
          <div className="about-text">{data.aboutus}</div>
        </div>
        <div className="about-images">
          <div className="image-1">{data.image1}</div>
          <div className="image-2">{data.image2}</div>
        </div>
      </section>

      <section id="Events" className="events-section">
        <h2 className="event-heading"> RECENT EVENTS</h2>
        <div className="event-container">
          {ngo.events.map((event, index) => (
            <div key={index} className="event">
              {event.image && (
                <img src={event.image} alt={`Event ${index + 1}`} />
              )}
              <p className="event-description">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer id="ContactUs" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <div className="image-container">{data.contactimg}</div>

            <div className="connect-text">
              <h2>Connect With Us</h2>
            </div>
          </div>
          <div className="contact-details">
            <div className="email">{data.emailId}</div>
            <div className="pho.no">{data.phoneNumber}</div>
          </div>
          <div className="contact-buttons">
            <button className="volunteer-button">Volunteer</button>
            <button className="donor-button">Donor</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
