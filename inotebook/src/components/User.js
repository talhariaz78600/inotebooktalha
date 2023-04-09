import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
function User() {
    const user=useContext(noteContext);
    const {show}=user;
  
    
  return (
    <div className="container" style={{marginTop:"150px"}}>
    <div className="card m-auto" style={{width:"450px"}}>
      <div className="card-header">
        <h2 className="text-center">User</h2>
      </div>
      <div className="card-body">
        <h5 className="card-title text-center">{show.name}</h5>
        <p className="card-text text-center">{show.email}</p>
        <p className="card-text text-center">{show.date}</p>
      </div>
    </div>
  </div>
  )
}

export default User
