import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Template1.css";
import { useParams } from "react-router-dom";
import { IoMdListBox } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Template1 = () => {
  const [ngo, setNgo] = useState(null);
  const [userrole, setrole] = useState("");
  const { ngo_id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNgoData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${apiUrl}/templates/fetchtemplate`,
          { ngo_id },
          { withCredintials: true ,headers: {'Authorization': `Bearer ${token}`}}
        );
        setNgo(response.data.template1);
      } catch (error) {
        console.error("Error fetching NGO data:", error);
      }
    };
    const fetchRole = async () => {
      try{
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${apiUrl}/roles/fetchRole`,
          { ngo_id },
          { withCredintials: true,headers: {'Authorization': `Bearer ${token}`} }
        );
        if(res.status === 200 ){
          setrole(res.data.role.role);
        }
        console.log(res);
      }
      catch (error){
        console.error("Error fetching role:", error);
      }
    }
    fetchNgoData();
    fetchRole();
  }, [ngo_id]);
  if (!ngo) {
    return <div>Loading...</div>;
  }

  const handleAllTasks = () => {
    // navigate(`/AllTasks/${userrole}`);
    navigate("/taskassign");
  };
  const handlerole = async (choosed_role) => {
    try{
      const token = localStorage.getItem("token");
      const role = choosed_role;
      const res = await axios.post(
        `${apiUrl}/roles/signupRole`,
        { ngo_id, role },
        { withCredintials: true, headers: {'Authorization': `Bearer ${token}`} }
      );
      console.log(res);
      if(res.status === 201){
        setrole(res.data.userRole.role);
        alert(`Signed up as ${choosed_role}`);
      }
    }
    catch (error){
      console.error("Error storing role:", error);
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
          {userrole === "" && (<div className="contact-buttons">
            <button className="volunteer-button" onClick={() => handlerole("volunteer")}>Volunteer</button>
            <button className="donor-button" onClick={() => handlerole("donor")}>Donor</button>
            <button className="executive-button" onClick={() => handlerole("executive")}>Executive</button>
          </div>)}
        </div>
      </footer>
    </div>
  );
};

export default Template1;
