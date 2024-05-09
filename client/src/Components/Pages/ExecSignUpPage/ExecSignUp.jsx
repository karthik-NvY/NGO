import React from 'react';
import './ExecSignUp.css';
import NGONavbar from '../NgoView/NGONavbar/NGONavbar';

const ExecSignUp = () => {

    const handlefetchRequest=()=>{
         
    }
  return (
    <div className='main1'>
      <NGONavbar name={localStorage.getItem('ngo_name')} logo={localStorage.getItem('ngo_logo')} id={localStorage.getItem('ngo_id')} />
      <div className='centered-content'>
        <h1 className='table_head'>Request To become Executives</h1>
        <div className='box'>
              
        </div>
      </div>
    </div>
  );
};

export default ExecSignUp;

