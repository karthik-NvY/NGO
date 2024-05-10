import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./TemplateEdit.css";

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

import eventpic from "../../Assets/event.png";
import ideas from "../../Assets/ideas.png";
import goals from "../../Assets/goals.png";
import axios from "axios";

import logo1 from "../../Assets/logo_big.png"
import contactImagepath from "../../Assets/contactus.png"
import mainbg from "../../Assets/main.png"

const TemplateEdit = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [loading, setLoading] = useState(false);

  const [logo, setLogo] = useState(null);
  const [logoUploaded, setLogoUploaded] = useState(false);

  const [main, setMain] = useState(null);
  const [mainUploaded, setMainUploaded] = useState(false);

  const [ngoName, setNgoName] = useState("Your NGO name");
  const [aboutUsText, setAboutUsText] = useState(
    "Present your features and describe your goals."
  );

  const [visionText, setVisionText] = useState(
    "Present your Vision"
  );

  const [eventText, seteventText] = useState(
    "Present overall description about events."
  );

  const [aboutUsImage2, setAboutUsImage2] = useState(null);
  const [aboutUsImage2Uploaded, setAboutUsImage2Uploaded] = useState(false);

  const [aboutUsImage, setAboutUsImage] = useState(null);
  const [aboutUsImageUploaded, setAboutUsImageUploaded] = useState(false);

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

  const [recentEvents, setRecentEvents] = useState([
    { id: 1, image: null, description: "Description for Event", uploaded:false},
    { id: 2, image: null, description: "Description for Event", uploaded:false},
    { id: 3, image: null, description: "Description for Event", uploaded:false},
    { id: 4, image: null, description: "Description for Event", uploaded:false},
  ]);

  const [email, setEmail] = useState("Your email");
  const [phoneNumber, setPhoneNumber] = useState("Your contact");
  const [x, setX] = useState("Your X handle");
  const [insta, setInsta] = useState("Your Insta handle");
  
  const [contactImage, setContactImage] = useState(null);
  const [contactImageUploaded, setContactImageUploaded] = useState(false);

  const logoRef = useRef(null);
  const mainRef = useRef(null);
  //   const aboutUsImage1Ref = useRef(null);
  const aboutUsImage2Ref = useRef(null);
  const aboutUsImageRef = useRef(null);
  const contactImageRef = useRef(null);
  const eventRef = [useRef(null), useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

  const handlePublish = async (event) => {
    setLoading(true);
    event.preventDefault();

    const image_files = [
      logo,
      main,
      aboutUsImage,
      aboutUsImage2,
      contactImage
    ]

    const event_images = recentEvents
    .filter(event => event.uploaded)
    .map(event => event.image)

    const Images = image_files.concat(event_images);

    const image_status = [
      logoUploaded,
      mainUploaded,
      aboutUsImageUploaded,
      aboutUsImage2Uploaded,
      contactImageUploaded
    ]

    const Signals = image_status.concat(recentEvents
      .map(event => event.uploaded));
    

    const event_descriptions = recentEvents
    .filter(event => event.description !== "Description for Event")
    .map(event => event.description)


    const texts = {
      name : ngoName,
      visionText:visionText,
      aboutUsText: aboutUsText,
      eventBottomText: eventText,
      email:email !== "Your email" ? email : "",
      phoneNumber:phoneNumber != "Your Contact" ? phoneNumber : "",
      instahandle:insta!= "Your Insta handle" ? insta : "",
      xhandle:x!="Your X handle" ? x : ""
    }

    const formData = new FormData();

    recentEvents.forEach((event, index) => {
      if (event.description !== "Description for Event") {
        formData.append(`eventDescriptions[${index}]`, event.description);
      }
      else{
        formData.append(`eventDescriptions[${index}]`, '');
      }
    });

    Images.forEach((file, index) => {
      formData.append('images', file);
    });
    
    Signals.forEach((status, index) => {
      formData.append('image_status', status); // Use '[]' to indicate an array
    });

    Object.entries(texts).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(
          `${apiUrl}/templates/storetemplate`,
          formData,
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
          }
        );
        if(response.status==201 && response.data.success){
          const res_id = response.data.response.ngo_id
          const res_name = response.data.response.name
          localStorage.setItem("ngo_id", res_id);
          navigate(`/ngo/${res_name}/${res_id}`, { replace: true });
        }
        console.log(response);
    } 
    catch (error) {
        console.error('Error uploading image:', error);
    }
    setLoading(false);
  };

  const handleLogoChange = (event) => {
    if(event.target.files[0]){
      setLogo(event.target.files[0]);
      setLogoUploaded(true);
    }
  };

  const handleLogoClick = (event) => {
    logoRef.current.click();
  };

  const handleNgoNameChange = (event) => {
    const value = event.target.value;
    const maxLength = 34;
    if (value.length <= maxLength) {
      setNgoName(value); // Update the input value state
    }
  };

  const handleMainChange = (event) => {
    if (event.target.files[0]){
      setMain(event.target.files[0]);
      setMainUploaded(true);  
    }    
  };

  const handleMainClick = (event) => {
    mainRef.current.click();
  };

  const handleVisionChange = (event) => {
    setVisionText(event.target.value);
  };

  const handleAboutUsTextChange = (event) => {
    setAboutUsText(event.target.value);
  };

  const handleAboutUsImageChange = (event) => {
    //setAboutUsImage2(URL.createObjectURL(event.target.files[0]));
    if(event.target.files[0]){
      setAboutUsImage(event.target.files[0]);
      setAboutUsImageUploaded(true);
    }
  };

  const handleAboutUsImageClick = () => {
    aboutUsImageRef.current.click();
  };

  const handleAboutUsImage2Change = (event) => {
    //setAboutUsImage2(URL.createObjectURL(event.target.files[0]));
    if(event.target.files[0]){
      setAboutUsImage2(event.target.files[0]);
      setAboutUsImage2Uploaded(true);  
    }
  };

  const handleAboutUsImage2Click = () => {
    aboutUsImage2Ref.current.click();
  };

  const handleAddEvent = () => {
    const maxId = recentEvents.reduce((max, event) => {
      return event.id > max ? event.id : max;
    }, 0);

    const newEvent = {
      id: maxId + 1,
      image: null,
      description: "Description for Event",
      uploaded:false
    };
    setRecentEvents([...recentEvents, newEvent]);
    console.log(recentEvents.length);
    if(recentEvents.length > 8){
      const add_button = document.getElementById('event-add-button-id');
      add_button.style.pointerEvents = 'none';
    }
    if(recentEvents.length > 1){
      const delete_spans = document.querySelectorAll('.event-delete-button');
      delete_spans.forEach(span => {
          span.style.pointerEvents = 'auto';
      });
    }
  };

  const handleDeleteEvent = (id) => {
    setRecentEvents(recentEvents.filter((event) => event.id !== id));
    if(recentEvents.length < 12){
      const add_button = document.getElementById('event-add-button-id');
      add_button.style.pointerEvents = 'auto';
    }
    if(recentEvents.length < 5){
      const delete_spans = document.querySelectorAll('.event-delete-button');
      delete_spans.forEach(span => {
          span.style.pointerEvents = 'none';
      });
    }
  };

  const handleEventImageClick = (id) => {
    eventRef[id].current.click();
  };

  const handleEventImageChange = (id, file) => {
    setRecentEvents(
      recentEvents.map((event) => {
        if (event.id === id && file) {
          event.uploaded = true;
          return { ...event, image: file };
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

  const handleEventTextChange = (event) => {
    seteventText(event.target.value);
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

  const handleContactImageChange = (event) => {
    if(event.target.files[0]){
      setContactImage(event.target.files[0]);
      setContactImageUploaded(true);  
    }
  };

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

  setaboutus_image1_anim(anime({
    targets:document.getElementById('about-images-1-id'),
    width:['0%', '100%'],
    duration:2000,
    easing:'easeOutCubic',
    autoplay:false,
  }));
  
  setaboutus_image2_anim(anime({
    targets:document.getElementById('about-images-2-id'),
    width:['0%', '100%'],
    duration:2000,
    easing:'easeOutCubic',
    autoplay:false,
  }));

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

useEffect(() => {
    if (aboutus_image1_anim) {
      window.addEventListener('scroll', ()=>{
        var scrollstat = (window.scrollY / window.innerHeight);
        aboutus_image1_anim.seek(scrollstat * aboutus_image1_anim.duration);
    });   
  }
}, [aboutus_image1_anim]);

useEffect(() => {
    if (aboutus_image2_anim) {
      window.addEventListener('scroll', ()=>{
        if (window.scrollY < window.innerHeight){
          var scrollstat = (window.scrollY / window.innerHeight);  
        }
        else{
          var scrollstat = (2*window.innerHeight - window.scrollY)/window.innerHeight  
        }
        aboutus_image2_anim.seek(scrollstat * aboutus_image2_anim.duration);
    });   
  }
}, [aboutus_image2_anim]);

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


const handleUploadhover = (fileid) =>{
  upload_icon_anim.play();
  upload_text_anim.play();
  upload_icon_anim.finished.then(() => {
    upload_icon_anim.reverse();
  })
  upload_text_anim.finished.then(() => {
    upload_text_anim.reverse();
  })
}

const handlePublishhover = () =>{
  publish_icon_anim.play();
  publish_text_anim.play();
  publish_button_anim.play();
  publish_icon_anim.finished.then(() => {
    publish_icon_anim.reverse();
  })
  publish_text_anim.finished.then(() => {
    publish_text_anim.reverse();
  })
  publish_button_anim.finished.then(() => {
    publish_button_anim.reverse();
  })
}

// const handleUploadmouseout = (fileid) =>{
//   console.log("gwgwgww");

//   upload_icon_anim.finished.then(() => {
//     upload_icon_anim.play();
//   })
//   upload_text_anim.finished.then(() => {
//     upload_text_anim.play();
//   })
//   upload_icon_anim.finishedr.then(() => {
//     upload_icon_anim.reverse();
//   })
//   upload_text_anim.finished.then(() => {
//     upload_text_anim.reverse();
//   })
// }

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Creating your page</div>
        </div>
      )}
      <div className="temp1">
      <header>
        <div className="logo">
          <div className="logopic" onClick={handleLogoClick}>
            {!logoUploaded && <img src={logo1} alt="Logo" className="logo-img"/>}
            {logoUploaded && <img src={URL.createObjectURL(logo)} alt=" Logo" className="logo-img"/>}
            <div className="lplus-button">
                  <span className="lplus-icon"><FaUpload /></span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              ref={logoRef}
              className="logo-input"
            />
          </div>
          <div className="logo-name">
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
      <div id="Home" className="main-bg">
        {!mainUploaded && <img className = "main-bg-image" src={mainbg} alt="Main" />}
        {mainUploaded && <img src={URL.createObjectURL(main)} className="main-bg-image" alt="Main" />}        
        <div className="vision">
          <textarea
              type="text"
              value={visionText}
              onChange={handleVisionChange}
              className="vision-textarea"
              maxLength="50"
          />
        </div>
        <div className="main-upload" id="upload-id">
          <input
                type="file"
                accept="image/*"
                onChange={handleMainChange}
                ref={mainRef}
                className="main-upload-input"
                id="main-upload-input-id"
          />
          <div className="upload-icon" id="upload-icon-id"
            onClick={() => document.getElementById('main-upload-input-id').click()}
            onMouseEnter={() => handleUploadhover('upload-id')}
            onMouseLeave={() => handleUploadhover('upload-id')}>
            <IoIosCloudUpload />
          </div>
          <div className="upload-text" id="upload-text-id">
            Background
          </div>
        </div>
      </div>
      <section className="about-section" id="about-section-id">
        <div className="about-content">
          <div className="about-heading" id="about-heading-id">
            <h2>ABOUT US</h2>
          </div>
          <div className="about-text" id="about-textarea-id">
            <textarea
              type="text"
              value={aboutUsText}
              onChange={handleAboutUsTextChange}
              className="about-textarea"
              maxLength="1200"
              id="about-text-id"
            />
          </div>
        </div>
        <div className="about-images">
          <div className="about-images-1" onClick={handleAboutUsImageClick} id="about-images-1-id">
            <div className="about-images-upload">
              <span className="about-images-upload-icon"><FaUpload /></span>
            </div>
            {!aboutUsImageUploaded && <img src={ideas} alt="About us 1 Pic"  className="about-image-1img"/>}
            {aboutUsImageUploaded && <img src={URL.createObjectURL(aboutUsImage)} alt="About us 2 Pic" className="about-image-2img"/>}
            <input
              type="file"
              accept="image/*"
              onChange={handleAboutUsImageChange}
              ref={aboutUsImageRef}
              className="about-images-input"
            />
          </div>
          <div className="about-images-2" onClick={handleAboutUsImage2Click} id="about-images-2-id">
            {!aboutUsImage2Uploaded && <img src={goals} alt="About us 2 Pic" className="about-image-2img"/>}
            {aboutUsImage2Uploaded && <img src={URL.createObjectURL(aboutUsImage2)} alt="About us 2 Pic" className="about-image-2img"/>}
            <div className="about-images-upload">
              <span className="about-images-upload-icon"><FaUpload /></span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAboutUsImage2Change}
              ref={aboutUsImage2Ref}
              className="about-images-input"
            />
          </div>
          {/*<button onClick={handleUpload}>Upload</button>*/}
        </div>
      </section>
      <section id="Events" className="events-section">
        <h2 className="event-heading"> RECENT EVENTS</h2>
        <div className="event-add">
          {/*<span className="event-add-text">
            Event
          </span>*/}
          <span className="event-add-button" onClick={handleAddEvent} id="event-add-button-id">
            <MdOutlinePostAdd />
          </span>
        </div>
        <div className="event-container">
          {recentEvents.map((events) => (
            <div key={events.id} className="event">
              <div className="event-image" onClick={()=>handleEventImageClick(events.id-1)}>
                {events.uploaded && (
                  <img
                    src={URL.createObjectURL(events.image)}
                    alt={`Event ${events.id}`}
                    className="event-image-img"
                  />
                )}
                {!events.uploaded && (
                  <img
                    src={eventpic}
                    alt={`Event ${events.id}`}
                    className="event-image-img"
                  />
                )}
                <div className="event-image-upload">
                  <span className="event-image-upload-icon"><FaUpload /></span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleEventImageChange(events.id, e.target.files[0])
                  }
                  ref={eventRef[events.id-1]}
                  className="event-image-input"
                />
              </div>
              <div className="event-description">
                <textarea
                  type="text"
                  value={events.description}
                  onChange={(e) =>
                    handleEventDescriptionChange(events.id, e.target.value)
                  }
                  maxLength="70"
                />
              </div>

              <div className="event-actions">
                <span onClick={() => handleDeleteEvent(events.id)} className="event-delete-button">
                  <MdDeleteForever />
                </span>
              </div>
            </div>
          ))}
        </div> 
        <div className="event-bottom-text">
        <textarea
              type="text"
              value={eventText}
              onChange={handleEventTextChange}
              className="event-bottom-textarea"
              maxLength="300"
              rows="2"
        />
        </div>
      </section>
      <footer id="ContactUs" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <div className="image-container" onClick={handleContactImageClick}>
              <div className="contact-image-upload">
                <span className="contact-image-upload-icon"><FaUpload /></span>
              </div>
              {!contactImageUploaded && <img src={contactImagepath} alt="Contact Pic" />}
              {contactImageUploaded && <img src={URL.createObjectURL(contactImage)} alt="Contact Pic" />}
              <input
                id="contactImageInput"
                type="file"
                onChange={handleContactImageChange}
                ref={contactImageRef}
                className="contact-image-input"
              />
            </div>            
          </div>
          <div className="connect-text">
              <h2>Connect With Us</h2>
          </div>
          <div className="contact-details">
            <div className="contact-details-email">
              <span className="contact-details-email-icon"><IoIosMail /></span>
              <textarea
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
              // onClick={handleEmailClick}
              />
            </div>
            <div className="contact-details-phone">
              <span className="contact-details-phone-icon"><FaPhone /></span>
              <textarea
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength="14"
                // onClick={handlePhoneClick}
              />
            </div>            
            <div className="contact-details-x">
              <span className="contact-details-x-icon"><FaXTwitter /></span>
              <textarea
                type="text"
                value={x}
                onChange={(e) => setX(e.target.value)}
                maxLength="14"
                // onClick={handlePhoneClick}
              />
            </div>
            <div className="contact-details-insta">
              <span className="contact-details-insta-icon"><FaInstagram /></span>
              <textarea
                type="text"
                value={insta}
                onChange={(e) => setInsta(e.target.value)}
                maxLength="14"
                // onClick={handlePhoneClick}
              />
            </div>
          </div>
          {/*<div className="contact-buttons">
            <button className="volunteer-button">Volunteer</button>
            <button className="donor-button">Donor</button>
          </div>*/}
        </div>
      </footer>
      <div className="publish-button" id="publish-button-id" onClick={handlePublish}>            
            <div className="publish-icon" id="publish-icon-id"
              onMouseEnter={() => handlePublishhover()}
              onMouseLeave={() => handlePublishhover()}>
              <IoMdCloudDone />
            </div>            
            <div className="publish-text" id="publish-text-id">Publish</div>
      </div>
      </div>
    </>
  );
};

export default TemplateEdit;