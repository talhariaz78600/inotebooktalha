import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';

function Noteitem(props) {
  const note=useContext(noteContext);
  const {deletenote}=note;
  return (
    
    <div className='col-md-4 mt-5 shadow p-1 '>
    <div className="card">
    <div className="card-body">
    <h5 className="card-title">{props.notestate.title}</h5>
    <p className="card-text">{props.notestate.description}</p>
    <i className="fa-solid fa-trash-can mx-2 text-primary" onClick={()=>{deletenote(props.notestate._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2 text-primary" onClick={()=>{props.updatenote(props.notestate)}}></i>
    
    </div>
    </div>
    </div>
  )
}

export default Noteitem
