import React, { useState, useRef, useEffect } from "react";
import "./Template1.css";

import { FaUpload } from "react-icons/fa6";
import { IoIosCloudUpload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { IoMdCloudDone } from "react-icons/io";
import { MdCloudDone } from "react-icons/md";

import anime from 'animejs/lib/anime.es.js';

import axios from "axios";

import setAuthHeaders from "../../../Utils/setAuthHeaders";
console.log("wughwhiowfwo")
const Template1 = () => {
  
  const [upload_icon_anim, setupload_icon_anim] = useState(null)
  const [upload_text_anim, setupload_text_anim] = useState(null)

  const [aboutus_anim, setaboutus_anim] = useState(null)
  const [aboutus_heading_anim, setaboutus_heading_anim] = useState(null)
  const [aboutus_image1_anim, setaboutus_image1_anim] = useState(null)
  const [aboutus_image2_anim, setaboutus_image2_anim] = useState(null)
  const [aboutus_text_anim, setaboutus_text_anim] = useState(null)
  const [publish_text_anim, setpublish_text_anim] = useState(null)
  const [publish_icon_anim, setpublish_icon_anim] = useState(null)
  const [publish_button_anim, setpublish_button_anim] = useState(null)
    const [templateData,setTemplateData]=useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetchTemplateData(); // Fetch user profile data when component mounts
      }, []);
      useEffect(() => {
        setupload_icon_anim(anime({
          targets:document.getElementById('upload-icon-id'),
          duration: 200,
          easing: 'easeOutCubic',
          borderColor: '#000000',
          autoplay:false,
        }))
      
        setupload_text_anim(anime({
          targets:document.getElementById('upload-text-id'),
          width:['0%', '80%'],
          duration: 200,
          easing: 'easeOutCubic',
          autoplay:false,
        }));
      
        setaboutus_heading_anim(anime({
          targets:document.getElementById('about-heading-id'),
          fontSize:['1%', '300%'],
          duration:2000,
          easing:'easeOutCubic',
          autoplay:false,
        }));
      
        // setaboutus_image1_anim(anime({
        //   targets:document.getElementById('about-images-1-id'),
        //   width:['0%', '100%'],
        //   duration:2000,
        //   easing:'easeOutCubic',
        //   autoplay:false,
        // }));
        
        // setaboutus_image2_anim(anime({
        //   targets:document.getElementById('about-images-2-id'),
        //   width:['0%', '100%'],
        //   duration:2000,
        //   easing:'easeOutCubic',
        //   autoplay:false,
        // }));
      
        setaboutus_text_anim(anime({
          targets:document.getElementById('about-text-id'),
          fontSize:['0%', '100%'],
          width:['0%', '100%'],
          duration:2000,
          easing:'easeOutCubic',
          autoplay:false,
        }));
      
        setaboutus_anim(anime({
          targets:document.getElementById('about-section-id'),
          backgroundImage:['linear-gradient(-90deg, rgba(123, 115, 107, 1) 0px, rgba(214, 207, 200, 1) 100%)',
            'linear-gradient(180deg, rgba(123, 115, 107, 1) 0px, rgba(214, 207, 200, 1) 100%)'],
          duration:4000,
          easing:'linear',
          loop:true,
          autoplay:false
        }));
      
        setpublish_icon_anim(anime({
          targets:document.getElementById('publish-icon-id'),
          duration: 200,
          width:['100%', '30%'],
          borderLeft:['0px solid transparent', '2px solid white'],
          easing: 'easeOutCubic',
          autoplay:false,
        }))
      
        setpublish_button_anim(anime({
          targets:document.getElementById('publish-button-id'),
          width:['4%', '14%'],
          borderRadius:['10%', '2%'],
          duration: 200,
          easing: 'easeOutCubic',
          autoplay:false,
        }));
      
        setpublish_text_anim(anime({
          targets:document.getElementById('publish-text-id'),
          width:['0%', '70%'],
          duration: 200,
          easing: 'easeOutCubic',
          autoplay:false,
        }));
      },[]);
      
      
      useEffect(() => {
          if (aboutus_heading_anim) {
            window.addEventListener('scroll', ()=>{
              var scrollstat = (window.scrollY / window.innerHeight);
              aboutus_heading_anim.seek(scrollstat * aboutus_heading_anim.duration);
          });   
        }
      }, [aboutus_heading_anim]);
      
      // useEffect(() => {
      //     if (aboutus_image1_anim) {
      //       window.addEventListener('scroll', ()=>{
      //         var scrollstat = (window.scrollY / window.innerHeight);
      //         aboutus_image1_anim.seek(scrollstat * aboutus_image1_anim.duration);
      //     });   
      //   }
      // }, [aboutus_image1_anim]);
      
      // useEffect(() => {
      //     if (aboutus_image2_anim) {
      //       window.addEventListener('scroll', ()=>{
      //         if (window.scrollY < window.innerHeight){
      //           var scrollstat = (window.scrollY / window.innerHeight);  
      //         }
      //         else{
      //           var scrollstat = (2*window.innerHeight - window.scrollY)/window.innerHeight  
      //         }
      //         aboutus_image2_anim.seek(scrollstat * aboutus_image2_anim.duration);
      //     });   
      //   }
      // }, [aboutus_image2_anim]);
      
      useEffect(() => {
          if (aboutus_text_anim) {
            window.addEventListener('scroll', ()=>{
              if (window.scrollY < window.innerHeight){
                var scrollstat = (window.scrollY / window.innerHeight);  
              }
              else{
                var scrollstat = (2*window.innerHeight - window.scrollY)/window.innerHeight  
              }
              aboutus_text_anim.seek(scrollstat * aboutus_text_anim.duration);
          });   
        }
      }, [aboutus_text_anim]);
      
      useEffect(() => {
          if (aboutus_anim) {
            window.addEventListener('scroll', ()=>{
              // var scrollstat = (window.scrollY-window.innerHeight)/window.innerHeight;
              var scrollstat = (window.scrollY / window.innerHeight);
              aboutus_anim.seek(scrollstat * aboutus_anim.duration);
          });   
        }
      }, [aboutus_anim]);
      
      const fetchTemplateData = async () => {
        try {
          const token = localStorage.getItem("token");
          const ngo_id = localStorage.getItem("ngo_id");
          console.log("hooo", ngo_id)
          setAuthHeaders(token);
          const response = await axios.post(`${apiUrl}/templates/fetchtemplate`, { token, ngo_id }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          console.log("response down here");
          console.log(response);
          setTemplateData(response.data.template);
          console.log("temp down here");
          console.log(response.data.template.aboutUsText);
         
          
        } catch (error) {
          console.error("Error fetching Template data :", error);
        }
      }
      ;
  return (
      <div className="temp1">
    {templateData && (
      <>
        <header>
          <div className="logo1">
            <div className="logopic1">
              {/* Check if logo exists before rendering */}
              {templateData.logo && <img src={templateData.logo} alt="Logo" className="logo-img1"/>}
            </div>
            <div className="logo-name1">
              {templateData.name}
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
        <div id="Home" className="main-bg1">
          {/* Check if main exists before rendering */}
          {templateData.main && <img src={templateData.main} className="main-bg-image1" alt="Main" />}
          <div className="vision_view1">
            {templateData.visionText}
          </div>
        </div>
        <section className="about-section1" id="about-section-id">
        <div className="about-content1">
          <div className="about-heading1" id="about-heading-id">
            <h2>ABOUT US</h2>
          </div>
          <div className="about-text1" id="about-textarea-id">
            <div className="about-textarea1">
                   {templateData.aboutUsText}
            </div>
          </div>
        </div>
        <div className="about-images1">
          <div className="about-images-11" >
            {<img src={templateData.aboutUsImage} alt="About us 2 Pic" className="about-image-2img1"/>}
          </div>
          <div className="about-images-21" >
            {<img src={templateData.aboutUsImage2} alt="About us 2 Pic" className="about-image-2img1"/>}
          </div>
        </div>
      </section>
      <section id="Events" className="events-section1">
        <h2 className="event-heading1"> RECENT EVENTS</h2>
        <div className="event-container1">
          {templateData.eventImages.length !==0 && (
           templateData.eventImages.map((image, index) => (
            <div key={index} className="event1">
              <div className="event-image1">
                <img
                  src={image} // Assuming each item in eventImages array is a URL string
                  className="event-image-img1"
                  alt={`Event ${index + 1}`}
                />
              </div>
              <div className="event-description1">
                <div className="event-description1-in">
                   {templateData.eventDescriptions[index]}
                </div>
              </div>
            </div>
          ))
          )}
        </div> 
        <div className="event-bottom-text1">
        {templateData.eventBottomText}
        </div>
      </section>
      <footer id="ContactUs" className="contact-section1">
        <div className="contact-container1">
          <div className="contact-info1">
            <div className="image-container1" >
              <img
                src={templateData.contactImage} // Assuming each item in eventImages array is a URL string
              />
            </div>            
          </div>
          <div className="connect-text1">
              <h2>Connect With Us</h2>
          </div>
          <div className="contact-details1">
            <div className="contact-details-email1">
              <span className="contact-details-email-icon1"><IoIosMail /></span>
              {templateData.email}
            </div>
            <div className="contact-details-phone1">
              <span className="contact-details-phone-icon1"><FaPhone /></span>
             {templateData.phoneNumber}
            </div>            
            <div className="contact-details-x1">
              <span className="contact-details-x-icon1"><FaXTwitter /></span>
              {templateData.xhandle}
            </div>
            <div className="contact-details-insta1">
              <span className="contact-details-insta-icon1"><FaInstagram /></span>
              {templateData.instahandle}
            </div>
          </div>
          <div className="contact-buttons1">
            <button className="volunteer-button1">Volunteer</button>
            <button className="donor-button1">Donor</button>
          </div>
        </div>
      </footer>
        </>
    )}
  </div>
  )
  
}

export default Template1
