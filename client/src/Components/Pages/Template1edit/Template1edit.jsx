import React, { useState, useRef, useEffect } from "react";
import "./Template1edit.css";

import { FaUpload } from "react-icons/fa6";
import { IoIosCloudUpload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import anime from 'animejs/lib/anime.es.js';

import event1 from "../../Assets/event1.png";
import event2 from "../../Assets/event2.png";
import event3 from "../../Assets/event3.png";
import event4 from "../../Assets/event4.png";
import ideas from "../../Assets/ideas.png";
import goals from "../../Assets/goals.png";
import axios from "axios";

import logo1 from "../../Assets/logo_big.png"
import ab from "../../Assets/aboutus2.png"
import contactImagepath from "../../Assets/contactus.png"
import mainbg from "../../Assets/hero.png"

const Template1edit = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [logo, setLogo] = useState(null);
  const [logoUploaded, setLogoUploaded] = useState(false);

  const [main, setMain] = useState(null);
  const [mainUploaded, setMainUploaded] = useState(false);

  const [ngoName, setNgoName] = useState("Your NGO name");
  const [aboutUsText, setAboutUsText] = useState(
    // "Welcome to our website! We are a team of passionate individuals who and engaging. We are committed to delivering value to our users and helping them achieve their goals. Our team consists of experienced professionals who are experts in their respective fields. We have a diverse range of skills and expertise, allowing us to create a wide variety of content that caters to the needs of our users.We are constantly striving to improve and grow, and we welcome any feedback or suggestions from our users. Thank you for choosing to be a part of our community."
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

  const events_init = [event1, event2, event3, event4]

  const [recentEvents, setRecentEvents] = useState([
    { id: 1, image: null, description: "Description for Event 1", uploaded:false},
    { id: 2, image: null, description: "Description for Event 2", uploaded:false},
    { id: 3, image: null, description: "Description for Event 3", uploaded:false},
    { id: 4, image: null, description: "Description for Event 4", uploaded:false},
  ]);

  const [email, setEmail] = useState("2021csb1137@iitrpr.ac.in");
  const [phoneNumber, setPhoneNumber] = useState("+91 8985618658");
  
  const [contactImage, setContactImage] = useState(null);
  const [contactImageUploaded, setContactImageUploaded] = useState(false);

  const logoRef = useRef(null);
  const mainRef = useRef(null);
  //   const aboutUsImage1Ref = useRef(null);
  const aboutUsImage2Ref = useRef(null);
  const aboutUsImageRef = useRef(null);
  const contactImageRef = useRef(null);
  const eventRef = [useRef(null), useRef(null), useRef(null), useRef(null)]

  //   useEffect(() => {
  //     // Function to send data to backend whenever inputs change
  //     sendDataToBackend();
  //   }, [
  //     logo,
  //     ngoName,
  //     aboutUsText,
  //     //aboutUsImage1,
  //     aboutUsImage2,
  //     recentEvents,
  //     email,
  //     phoneNumber,
  //     contactImage,
  //   ]);

  const sendDataToBackend = async () => {
    // Prepare data object to send to backend
    // const data = {
    //   logo,
    //   ngoName,
    //   aboutUsText,
    //   aboutUsImage1,
    //   //aboutUsImage2,
    //   recentEvents,
    //   email,
    //   phoneNumber,
    //   contactImage,
    // };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/templates/storetemplate`,
        {
          logo,
          ngoName,
          aboutUsText,
          aboutUsImage2,
          recentEvents,
          email,
          phoneNumber,
          contactImage,
        },
        { withCredentials: true ,headers: {'Authorization': `Bearer ${token}`}}
      );
      console.log("Success:", response.data);
      // navigate("/Verification");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // axios
  //   .post("/template1", data)
  //   .then((response) => {
  //     console.log("Success:", response.data);
  //     // Handle success response from backend
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //     // Handle error
  //   });

  const handlePublish = () => {
    sendDataToBackend();
  };

  const handleLogoChange = (event) => {
    try {
      setLogo(event.target.files[0]);
      setLogoUploaded(true);
    } catch (error) {
      console.error("Error creating object URL:", error);
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

  const handleAboutUsTextChange = (event) => {
    setAboutUsText(event.target.value);
  };

  //   const handleAboutUsImage1Change = (event) => {
  //     setAboutUsImage1(URL.createObjectURL(event.target.files[0]));
  //   };

  //   const handleAboutUsImage1Click = () => {
  //     aboutUsImage1Ref.current.click();
  //   };


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
    const newEvent = {
      id: recentEvents.length + 1,
      image: null,
      description: "",
    };
    setRecentEvents([...recentEvents, newEvent]);
  };

  const handleDeleteEvent = (id) => {
    setRecentEvents(recentEvents.filter((event) => event.id !== id));
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

  const handleImageChange = (event) => {
    setContactImage(URL.createObjectURL(event.target.files[0]));
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

  const handleUpload2 = async (event) => {
    event.preventDefault();

    const image_files = [
      logo,
      main,
      aboutUsImage2,
      contactImage
    ]
    const image_status = [
      logoUploaded,
      mainUploaded,
      aboutUsImage2Uploaded,
      contactImageUploaded
    ]
    
    const texts = {
      name : ngoName,
      vision:visionText,
      aboutUsText: aboutUsText
    }

    const formData = new FormData();

    image_files.forEach((file, index) => {
      formData.append('images', file);
    });
    
    image_status.forEach((status, index) => {
      formData.append('image_status', status); // Use '[]' to indicate an array
    });

    Object.entries(texts).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(
        `${apiUrl}/templates/storetemplatetmp`,
        formData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        }
      );
        console.log(response);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};


useEffect(() => {
  setupload_icon_anim(anime({
    targets:document.getElementById('upload-icon-id'),
    duration: 500,
    easing: 'easeOutCubic',
    borderColor: '#000000',
    autoplay:false,
  }))

  setupload_text_anim(anime({
    targets:document.getElementById('upload-text-id'),
    width:['0%', '80%'],
    duration: 500,
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
    backgroundImage:['linear-gradient(-90deg, rgba(123, 115, 107, 0.9) 0px, rgba(214, 207, 200, 1) 100%)',
      'linear-gradient(180deg, rgba(123, 115, 107, 0.9) 0px, rgba(214, 207, 200, 1) 100%)'],
    duration:4000,
    easing:'easeInCubic',
    loop:true,
    autoplay:false
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

const handleUpload = (fileid)=>{
  document.getElementById(fileid).click()
}

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

const handleVisionChange = (event) => {
    setVisionText(event.target.value);
  };

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
    <div className="temp1">
      {" "}
      <header>
        <div className="logo">
          <div className="logopic" onClick={handleLogoClick}>
            {!logoUploaded && <img src={logo1} alt="Logo" />}
            {logoUploaded && <img src={URL.createObjectURL(logo)} alt=" Logo" />}
            <div className="lplus-button">
                <button>
                  <span className="lplus-icon"><FaUpload /></span>
                </button>
              </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              ref={logoRef}
              className="Image-1"
            />
          </div>
          <div className="name">
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
        {!mainUploaded && <img className = "main-bg-image" src='https://static.vecteezy.com/system/resources/thumbnails/007/522/796/small/abstract-geometric-white-stripe-shapes-with-golden-light-in-gradient-white-background-free-vector.jpg' alt="Main" />}
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
            onClick={() => handleUpload('main-upload-input-id')}
            onMouseEnter={() => handleUploadhover('upload-id')}
            onMouseLeave={() => handleUploadhover('upload-id')}>
            <IoIosCloudUpload />
          </div>
          <div className="upload-text" id="upload-text-id">
            Background
          </div>
        </div>
      </div>
      <section id="AboutUs" className="about-section" id="about-section-id">
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
              maxLength="300"
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
              className="Image-3"
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
              className="Image-3"
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
          <span className="event-add-button" onClick={handleAddEvent}>
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
                    src={events_init[events.id-1]}
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
              maxLength="50"
        />
        </div>
      </section>
      <footer id="ContactUs" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <div className="image-container" onClick={handleContactImageClick}>
              {!contactImageUploaded && <img src={contactImagepath} alt="Contact Pic" />}
              {contactImageUploaded && <img src={URL.createObjectURL(contactImage)} alt="Contact Pic" />}

              <input
                id="contactImageInput"
                type="file"
                onChange={handleImageChange}
                ref={contactImageRef}
                className="Image-4"
              />
            </div>

            <div className="connect-text">
              <h2>Connect With Us</h2>
            </div>
          </div>
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
          </div>
          <div className="contact-buttons">
            <button className="volunteer-button">Volunteer</button>
            <button className="donor-button">Donor</button>
          </div>
          <button className="publish-button" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Template1edit;
