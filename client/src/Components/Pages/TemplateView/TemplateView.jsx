import React from 'react'
import './TemplateView.css'
import temp1 from '../../Assets/pic1.jpeg'
import temp2 from '../../Assets/pic2.jpeg'
import NavBar from '../Dashboard/NavBar/NavBar'
//import { MdOutlineLock, MdOutlineEmail } from 'react-icons/md';
export const TemplateView = () => {
  return (
    <div className="wrapper">
        <NavBar/>
            <div className="leftside">
                <div className="matters">
                    <p>Build your own template choose from expertly curated colors, fonts, and page layouts to create a website template that matches your vision with CauseCraft Blueprint</p>
                </div>
                <div className="containerr">
                    <div className="img1">
                        <button><img src={temp1} alt="template1" /></button>
                        <p>Template 1</p>
                    </div>
                    <div className="img2">
                        <button><img src={temp2} alt="template2" /></button>
                        <p>Template 2</p>
                    </div>
                </div>
            </div>
            <div className="rightside">
                <form action="">

                    <div className="button3">
                        <h2>BUILD YOUR OWN TEMPLATE</h2>

                    </div>
                </form>
            </div >
        </div >
  )
}
