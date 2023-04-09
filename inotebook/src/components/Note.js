
import React, { useContext, useRef, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom';
function Note() {
  const note = useContext(noteContext);
  const { notestate, getnote, editnote } = note;
  const [nnote, setnnote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
  const history = useNavigate();
  const onChange = (e) => {
    setnnote({ ...nnote, [e.target.name]: e.target.value });
  }

  const handleclick = (e) => {
    e.preventDefault();
    // console.log(nnote);
    editnote(nnote.id, nnote.etitle, nnote.edescription, nnote.etag);
  }
  useEffect(() => {
    if (localStorage.getItem('tokenu')) {
      getnote();
      // eslint-disable-next-line
    }
    else {
      history("/login");
    }


  });
  const ref = useRef(null);
  const updatenote = (currentnote) => {
    // console.log(currentnote);
    setnnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    ref.current.click();
  }
  return (
    <div>
      <Addnote />

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <label htmlFor="etitle" className="col-sm-2 col-form-label">Title</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="etitle" name='etitle' value={nnote.etitle} onChange={onChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="edescription" className="col-sm-2 col-form-label">Discription</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="edescription" name='edescription' value={nnote.edescription} onChange={onChange} />
                  </div>

                  <div className="col-12  d-md-flex justify-content-md-end">


                  </div>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="close" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleclick}>updatenote</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="row">

          {/* <h2>{notestate.length===0?"Their is no note to show":""}</h2> */}
          {
            notestate.map((notestate) => {
              return <Noteitem key={notestate._id} notestate={notestate} updatenote={updatenote} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Note
