import React, { useState, useRef } from "react";
import "./Template2edit.css";

import logopic from "../../Assets/logo_big.png";
//create your own 3 events here --- testing
import event1 from "../../Assets/recent-img-1.png";
import event2 from "../../Assets/recent-image-2.png";
import event3 from "../../Assets/recent-image-3.png";

import axios from "axios";

const Template2edit = () => {
  const [hasClass, setHasClass] = useState(false);
  const [logo, setLogo] = useState(logopic);
  const [ngoName, setNgoName] = useState("NGO name");
  const [tagLine, setTagLine] = useState("Tagline");
  const [aboutUsText, setAboutUsText] = useState(
    "Welcome to our website! We are a team of passionate individuals who and engaging. We are committed to delivering value to our users and helping them achieve their goals. Our team consists of experienced professionals who are experts in their respective fields. We have a diverse range of skills and expertise, allowing us to create a wide variety of content that caters to the needs of our users.We are constantly striving to improve and grow, and we welcome any feedback or suggestions from our users. Thank you for choosing to be a part of our community."
  );

  //   const [aboutUsImage2, setAboutUsImage2] = useState(aboutus2);
  const [recentEvents, setRecentEvents] = useState([
    { id: 1, image: event1, description: "Description for Event 1" },
    { id: 2, image: event2, description: "Description for Event 2" },
    { id: 3, image: event3, description: "Description for Event 3" },
  ]);
  const [email, setEmail] = useState("1111@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("+91 6230456788");
  const [socialMedia, setSocialMedia] = useState("@twitter.com");
  const [otherLink, setOtherLink] = useState("@facebook.com");

  //   const [contactImage, setContactImage] = useState(contactus);

  const logoRef = useRef(null);
  //   const aboutUsImage1Ref = useRef(null);
  const aboutUsImage2Ref = useRef(null);
  const contactImageRef = useRef(null);
  const handlePopup = async (e) => {
    e.preventDefault();

    setHasClass(!hasClass);
  };

  const handleVolunteer = async (e) => {
    e.preventDefault();

    setHasClass(!hasClass);
  };

  const handleLogoChange = (event) => {
    try {
      setLogo(URL.createObjectURL(event.target.files[0]));
    } catch (error) {
      console.error("Error creating object URL:", error);
    }
  };

  const handleLogoClick = (event) => {
    logoRef.current.click();
  };

  const handleTagLineChange = (event) => {
    const value = event.target.value;
    const maxLength = 34;
    if (value.length <= maxLength) {
      setTagLine(value); // Update the input value state
    }
  };

  const handleNgoNameChange = (event) => {
    const value = event.target.value;
    const maxLength = 34;
    if (value.length <= maxLength) {
      setNgoName(value); // Update the input value state
    }
  };

  const handleAboutUsTextChange = (event) => {
    setAboutUsText(event.target.value);
  };

  //   const handleAboutUsImage1Change = (event) => {
  //     setAboutUsImage1(URL.createObjectURL(event.target.files[0]));
  //   };

  //   const handleAboutUsImage1Click = () => {
  //     aboutUsImage1Ref.current.click();
  //   };

  //   const handleAboutUsImage2Change = (event) => {
  //     setAboutUsImage2(URL.createObjectURL(event.target.files[0]));
  //   };

  const handleAboutUsImage2Click = () => {
    aboutUsImage2Ref.current.click();
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: recentEvents.length + 1,
      image: null,
      description: "Add Description",
    };
    setRecentEvents([...recentEvents, newEvent]);
  };

  const handleDeleteEvent = (id) => {
    setRecentEvents(recentEvents.filter((event) => event.id !== id));
  };

  const handleEventImageChange = (id, file) => {
    setRecentEvents(
      recentEvents.map((event) => {
        if (event.id === id) {
          return { ...event, image: URL.createObjectURL(file) };
        }
        return event;
      })
    );
  };

  const handleEventDescriptionChange = (id, description) => {
    setRecentEvents(
      recentEvents.map((event) => {
        if (event.id === id) {
          return { ...event, description };
        }
        return event;
      })
    );
  };

  // const handleEmailClick = () => {
  //   window.location.href = mailto:${email};
  // };

  // const handlePhoneClick = () => {
  //   window.location.href = tel:${phoneNumber};
  // };

  const handleContactImageClick = () => {
    contactImageRef.current.click();
  };

  //   const handleImageChange = (event) => {
  //     setContactImage(URL.createObjectURL(event.target.files[0]));
  //   };
  return (
    <div className="temp2">
      {/* header section */}
      <header className="header2">
        <div className="logo">
          <div className="logopic" onClick={handleLogoClick}>
            {logo && <img src={logo} alt=" Logo" />}

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              ref={logoRef}
              className="Image-1"
            />
          </div>
          <div className="name1">
            <textarea
              type="text"
              value={ngoName}
              onChange={handleNgoNameChange}
              className="name-text"
            />
          </div>
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

      <div className="main-content">
        <div className="left-section">
          {/* Left section content goes here */}

          <div class="circle"></div>
          <div className="tagline">
            <div className="name2">
              <textarea
                type="text"
                value={tagLine}
                onChange={handleTagLineChange}
                className="name-text"
              />
            </div>
          </div>

          <div className="ngoname">{ngoName}</div>
        </div>
        <div className="right-section">
          {/* Right section content goes here */}
        </div>
      </div>

      {/* about us */}

      <div id="AboutUs" className="about-us">
        <div className="left1-section">
          <h2 className="left1-section-about-us">About Us </h2>

          <div className="about-text about-us-text">
            <textarea
              type="text"
              value={aboutUsText}
              onChange={handleAboutUsTextChange}
              className="about-textarea"
            />
          </div>
        </div>
        <div className="right1-section">

          <div className="squares-container">
            <div className="square square1"></div>
            <div className="square square2"></div>
            <div className="square square3"></div>
            <div className="square square4"></div>
          </div>
        </div>
      </div>

      {/* recent -event */}

      <div id="Events" className="recent-events">
        {/* <h2 className="event-heading"> RECENT EVENTS</h2> */}
        <div className="event-container">
          {recentEvents.map((event) => (
            <div key={event.id} className="event">
              {event.image && (
                <div className="image-container">
                  <img
                    src={event.image}
                    alt={`Event ${event.id}`}
                    className="event-image"
                  />
                </div>
              )}
              <div className="event-description">
                <textarea
                  type="text"
                  value={event.description}
                  onChange={(e) =>
                    handleEventDescriptionChange(event.id, e.target.value)
                  }
                />
              </div>

              <div className="event-actions">
                <button onClick={() => handleDeleteEvent(event.id)}>
                  Delete Event
                </button>
                <input
                  type="file"
                  onChange={(e) =>
                    handleEventImageChange(event.id, e.target.files[0])
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <button className="add-button" onClick={handleAddEvent}>
          Add Event
        </button>

        {/* thank you and contact us */}
      </div>

      <div id="ContactUs" className="contact-us">
        <div className="top-section">
          <h1>THANK YOU </h1>
          <p>TO JOIN US</p>

          <div className="contact2-buttons">
            <button className="volunteer-button" onClick={handleVolunteer}>
              Volunteer
            </button>
            <button className="donor-button">Donor</button>
          </div>
        </div>
        <div className="bottom-section">
          <h2>Contact Us </h2>
          <div className="contact-details">
            <textarea
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // onClick={handleEmailClick}
            />
            <textarea
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              // onClick={handlePhoneClick}
            />
            <textarea
              type="text"
              placeholder="Enter social account"
              value={socialMedia}
              onChange={(e) => setSocialMedia(e.target.value)}
            />

            <textarea
              type="text"
              placeholder="Other Link"
              value={otherLink}
              onChange={(e) => setOtherLink(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={hasClass ? "container-popup" : ""}>
        <div className={hasClass ? "popup-open" : "popup"}>
          <h2 className="popup-content">Please confirm that you are interested in volunteering to {ngoName} </h2>

          <button type="button" onClick={handlePopup}
          className="popup-btn"
          >

            I Confirm
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Template2edit;
