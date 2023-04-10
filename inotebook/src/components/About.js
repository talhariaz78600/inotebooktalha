import React from "react";
// import React ,{ useContext,useEffect } from 'react';
// import noteContext from '../context/notes/noteContext';
const About = () => {
  // const a=useContext(noteContext);
  // useEffect(() => {
  //   a.update();
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-8 border shadow" style={{marginTop:"150px"}} >
      <p className="mt-4">Note-taking apps have become increasingly popular in recent years, as people rely more on technology to manage their daily lives. These apps provide a convenient and secure way to store important information, ideas, and reminders. One such app is designed to allow users to create, delete, and update their notes while ensuring the security and privacy of their data.</p> 

        </div>
      </div>
    </div>
  );
}

export default About;
