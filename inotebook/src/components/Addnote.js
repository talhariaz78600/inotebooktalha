import { useContext ,useState} from 'react';
import noteContext from '../context/notes/noteContext';

function Addnote() {
  const note=useContext(noteContext);
  const [nnote,setnnote]=useState({title:"",description:"",tag:"default"})
  
  let [d,updated]=useState(1);
  const {addnote}=note;
  const onChange=(e)=>{
    setnnote({...nnote,[e.target.name]:e.target.value});
  }
  const handleclick=(e)=>{
    e.preventDefault();
    addnote(nnote.title,nnote.description,nnote.tag,d);
    updated(d=d+1);
    setnnote({title:"",description:"",tag:"default"});
  }
  return (
    <div>
      <div className="container" >
        <div className="row">
            <div className="col-12" style={{marginTop:"80px"}}>
                <h3>Add Note</h3>
            </div>
        </div>
             <form>
                <div className="row mb-3">
                  <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="title" name='title' value={nnote.title} onChange={onChange}/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="description" className="col-sm-2 col-form-label">Discription</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="description" name='description'  onChange={onChange} value={nnote.description}/>
                  </div>
                  
                  <div className="col-12  d-md-flex justify-content-md-end">
                  <button className='btn btn-primary mt-4' onClick={handleclick}> Add note</button>

                  </div>
                </div>
                
                  </form>
      
      </div>
    </div>
  )
}

export default Addnote
