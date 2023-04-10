import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

function Sign() {
    const history=useNavigate();
    const [auser,adduser]=useState({ename:"",email:"",password:""})
    const user=useContext(noteContext);
    const {Adduser}=user;
    const onChange=(e)=>{
        adduser({...auser,[e.target.name]:e.target.value});
      }
    const oncllick=(e)=>{
        e.preventDefault();
        Adduser(auser.ename,auser.email,auser.password,history);
    }
   
  return (
    <div>
         <div className="container" style={{backgroundColor:"#f8f9fa"}}>
                <div className="row justify-content-center">
                    <div className="col-md-5 mt-5 mb-2">
                        <div className="container" style={{border:"2px solid black",marginTop:"150px", borderRadius: "4px", backgroundColor: "#003049", height: "300px"}}>
                            <div className="row">
                                <div className="col-md-12 p-0 bg-primary text-center">
                                    <div>
                                        <h2>SignUp</h2>
                                    </div>
                                </div>
            
                                <div className="col-md-12 pt-3">
                                    <form action="" onSubmit={oncllick}>

                                    <div className="form-group">
                                        <input type="text" className="form-control  my-2" name="ename" id="ename" placeholder="Enter user name" onChange={onChange}/>
                                        <input type="email" className="form-control  my-2" name="email" id="email" onChange={onChange} placeholder="Enter  email "/>
                                        <input type="password" className="form-control my-2" name="password" id="password" onChange={onChange} placeholder="Enter password"/>
                                        
                                        <button type='submit' className="btn btn-primary my-2 form-control"> SignUp</button>
                                    </div>
                                    </form>
                                    {/* <!-- <div className="d-grid gap-2  mx-auto">
                                        <button className="btn  btn-lg btn-primary my-2"> login</button>
                                    </div> --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               </div> 
      
    </div>
  )
}

export default Sign
