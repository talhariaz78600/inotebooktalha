
import noteContext from "./noteContext";
import { useState } from "react";

const local='';
// const local='http://localhost:5000'
const Notestate = (props) => {

  const notes = []
  const [notestate, setnotestate] = useState(notes);
  const [show, sshow] = useState([]);




  //Fetchall note
  const getnote = async () => {
    ////api call////

    const response = await fetch(`${local}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('tokenu'),
        // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxYzM2OTU2ZjdjM2Y1NDI3NDViNzlmIn0sImlhdCI6MTY3OTU5ODc5OH0.TXDJApl_UKesRTHRKHCN7kR84Jm-fmD0ENmFmAnFpAk"
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOWViNWFjZGEyZTAwMDRjOTg0MGMzIn0sImlhdCI6MTY3ODM3MTY3NH0.ZDLN9FBubNRQYEA4tRVm7mVtpz9qBJPfBuHSFanNag0",
      }


    });
    const json = await response.json();
    // console.log(json)
    setnotestate(json);
  }


  // Add a note
  const addnote = async (title, description, tag, d) => {
    ////api call////
    await fetch(`${local}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('tokenu'),
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOWViNWFjZGEyZTAwMDRjOTg0MGMzIn0sImlhdCI6MTY3ODM3MTY3NH0.ZDLN9FBubNRQYEA4tRVm7mVtpz9qBJPfBuHSFanNag0"
      },

      body: JSON.stringify({ title, description, tag })
    });
    // const json=await response.json();
    // // console.log(json)
    const note = {
      "_id": `64130a33129eb92525edf0cf3${d}`,
      "user": "6409eb5acda2e0004c9840c3",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-03-16T12:23:13.387Z",
      "__v": 0
    }
    setnotestate(notestate.concat(note))
  }





  // Delete a note
  const deletenote = async (id) => {
    console.log("delete note sucessfull" + id);
    const Notede = notestate.filter((notestate) => {
      return notestate._id !== id
    })
    setnotestate(Notede)
    /// Api call
    await fetch(`${local}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('tokenu'),
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOWViNWFjZGEyZTAwMDRjOTg0MGMzIn0sImlhdCI6MTY3ODM3MTY3NH0.ZDLN9FBubNRQYEA4tRVm7mVtpz9qBJPfBuHSFanNag0"
      },

      body: JSON.stringify()
    });

  }







  // Edit a note 
  const editnote = async (id, title, description, tag) => {
    /// Api call
    await fetch(`${local}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('tokenu'),
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwOWViNWFjZGEyZTAwMDRjOTg0MGMzIn0sImlhdCI6MTY3ODM3MTY3NH0.ZDLN9FBubNRQYEA4tRVm7mVtpz9qBJPfBuHSFanNag0"
      },

      body: JSON.stringify({ title, description, tag })
    });
    // const json = await response.json();
    // console.log(json)
    // const json=response.JSON;
    for (let index = 0; index < notestate.length; index++) {
      const element = notestate[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

      // setnotestate(element);
    }
  }

  /////////////add user////////////////////
  const Adduser = async (name, email, password, history) => {
    const response = await fetch(`${local}/api/auth/createuser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

      },

      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    if (json.success === true) {
      history('/');
    }
    else {
      alert("this user already exits");
    }
  }
  //////////////user login/////////////////


  const loginuser = async (email, password, history) => {
    const response = await fetch(`${local}/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

      },

      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    if (json.success === true) {
      //redirect



      history('/');
      localStorage.setItem('tokenu', json.authtoken)
      setTimeout(() => {
        fetchuser();
      }, 2000);




    }
    else {
      alert("please enter valid data")
    }
    // console.log(json.authtoken)
    // console.log(token);


  }
  const fetchuser = async () => {
    const response = await fetch(`${local}/api/auth/getuser`, {
      method: "POST",

      headers: {

        "auth-token": localStorage.getItem('tokenu'),
      },

      body: JSON.stringify()
    });
    const json = await response.json();
    sshow(json);
  }

  return (
    <noteContext.Provider value={{ show, notestate, addnote, deletenote, editnote, getnote, Adduser, loginuser, fetchuser }} >
      {props.children}
    </noteContext.Provider>
  )
}
export default Notestate;