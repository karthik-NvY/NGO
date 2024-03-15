import React from "react";
import "./Templatepage1.css";
import hero from "../../Assets/hero.png";
import aboutus1 from "../../Assets/aboutus1.png";
import aboutus2 from "../../Assets/aboutus2.png";
import event1 from "../../Assets/event1.png";
import event2 from "../../Assets/event2.png";
import event3 from "../../Assets/event3.png";
import event4 from "../../Assets/event4.png";
import contactus from "../../Assets/contactus.png";
import logo from "../../Assets/home-icon.png";

export const Templatepage1 = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span className="name">NGO Name</span>
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
          <div className="image-slider">
            <img src={hero} alt="Image 1" />
            {/* <img src={image2} alt="Image 2" />
            <img src={image3} alt="Image 3" /> */}
          </div>
        </div>
      </section>
      <section id="AboutUs" className="about-section">
        <div className="about-content">
          <div className="about-heading">
            <h2>ABOUT US</h2>
          </div>
          <div className="about-text">
            <textarea name="para1" id="" cols="30" rows="10"></textarea>
            <p>
              Welcome to our website! We are a team of passionate individuals
              who and engaging. We are committed to delivering value to our
              users and helping them achieve their goals.
            </p>
            <p>
              Our team consists of experienced professionals who are experts in
              their respective fields. We have a diverse range of skills and
              expertise, allowing us to create a wide variety of content that
              caters to the needs of our users.
            </p>
            <p>
              We are constantly striving to improve and grow, and we welcome any
              feedback or suggestions from our users. Thank you for choosing to
              be a part of our community.
            </p>
          </div>
        </div>
        <div className="about-images">
          <img src={aboutus1} alt="About Us Image 1" className="image-1" />
          <img src={aboutus2} alt="About Us Image 2" className="image-2" />
        </div>
      </section>
      <section id="Events" className="events-section">
        <h2 className="event-heading"> RECENT EVENTS</h2>
        <div className="event-container">
          <div className="event">
            <img src={event1} alt="Event 1" className="event-img" />
            <div className="event-description">
              <h2>Event 1</h2>
              <p>Description of Event 1.</p>
            </div>
          </div>
          <div className="event">
            <img src={event2} alt="Event 2" className="event-img" />
            <div className="event-description">
              <h2>Event 2</h2>
              <p>Description of Event 2.</p>
            </div>
          </div>
          <div className="event">
            <img src={event3} alt="Event 3" className="event-img" />
            <div className="event-description">
              <h2>Event 3</h2>
              <p>Description of Event 3.</p>
            </div>
          </div>
          <div className="event">
            <img src={event4} alt="Event 4" className="event-img" />
            <div className="event-description">
              <h2>Event 4</h2>
              <p>Description of Event 4.</p>
            </div>
          </div>
          <div className="event">
            <img src={event1} alt="Event 5" className="event-img" />
            <div className="event-description">
              <h2>Event 5</h2>
              <p>Description of Event 5.</p>
            </div>
          </div>
        </div>
      </section>
      <footer id="ContactUs" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <div className="image-container">
              <img src={contactus} alt="Contact Pic" />
            </div>
            <div className="connect-text">
              <h2>Connect With Us</h2>
            </div>
          </div>
          <div className="contact-details">
            <p>Email: example@example.com</p>
            <p>Instagram: @example</p>
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
