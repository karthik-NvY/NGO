import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Template1.css";
import { useParams } from "react-router-dom";
import { IoMdListBox } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../Dashboard/ConfirmationModal/ConfirmationModal";

const Template1 = () => {
  const [ngo, setNgo] = useState(null);
  const { ngo_id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchNgoData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${apiUrl}/templates/fetchtemplate`,
          { ngo_id, token },
          { withCredintials: true }
        );
        setNgo(response.data);
      } catch (error) {
        console.error("Error fetching NGO data:", error);
      }
    };

    fetchNgoData();
  }, [ngo_id]);

  if (!ngo) {
    return <div>Loading...</div>;
  }

  const handleAllTasks = () => {
    navigate("/AllTasks");
  };

  const handleVolunteer = () => {
    const message = `Please confirm that you are interested in volunteering to ${ngo.ngoName}?`;
    setModalMessage(message);
    setShowConfirmationModal(true);
  };
  
  const handleDonor = () => {
    const message = `Please confirm that you are interested in donating to ${ngo.ngoName}?`;
    setModalMessage(message);
    setShowConfirmationModal(true);
  };  

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = showConfirmationModal === "volunteer" ? "Volunteer" : "Donor";
      const response = await axios.post(
        `${apiUrl}/api/rolesignup`,
        { token, role },
        { withCredentials: true }
      );
      console.log("Volunteering/donation successful", response);
      // Handle success response
    } catch (error) {
      console.error("Error in adding volunteering/donation:", error);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  return (
    <div className="temp1">
      <header>
        <div className="logo">
          <div className="logo">{ngo.logo}</div>
          <span className="name">{ngo.ngoName}</span>
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
            <li>
            <button onClick={handleAllTasks}>
            <IoMdListBox className="taskbutton" size={25} />
          </button>
            </li>
          </ul>
        </nav>
      </header>

      <section id="Home" className="hero-section">
        <div className="image-slider-container">
          <div className="image-slider">{ngo.heroimage}</div>
        </div>
      </section>

      <section id="AboutUs" className="about-section">
        <div className="about-content">
          <div className="about-heading">
            <h2>ABOUT US</h2>
          </div>
          <div className="about-text">{ngo.aboutUsText}</div>
        </div>
        <div className="about-images">
          <div className="image-1">{ngo.aboutUsImage1}</div>
          {/* <div className="image-2">{data.image2}</div> */}
        </div>
      </section>

      <section id="Events" className="events-section">
        <h2 className="event-heading"> RECENT EVENTS</h2>
        <div className="event-container">
          {ngo.events &&
            ngo.events.map((event, index) => (
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
            <div className="image-container">{ngo.contactImage}</div>

            <div className="connect-text">
              <h2>Connect With Us</h2>
            </div>
          </div>
          <div className="contact-details">
            <div className="email">{ngo.email}</div>
            <div className="pho.no">{ngo.phoneNumber}</div>
          </div>
          <div className="contact-buttons">
            <button className="volunteer-button" onClick={handleVolunteer}>Volunteer</button>
            <button className="donor-button" onClick={handleDonor}>Donor</button>
          </div>
          {showConfirmationModal && (
          <ConfirmationModal message={modalMessage} onConfirm={handleConfirm} />
        )}
        </div>
      </footer>
    </div>
  );
};

export default Template1;
