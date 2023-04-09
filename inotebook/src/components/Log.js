
import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate, Link } from 'react-router-dom';
function Log() {
    const [auser, adduser] = useState({ email: "", password: "" })
    const user = useContext(noteContext);
    const { loginuser } = user;
    const history = useNavigate();


    const onChange = (e) => {
        adduser({ ...auser, [e.target.name]: e.target.value });
    }

    const oncllick = (e) => {
        e.preventDefault();
        // history('/')
        loginuser(auser.email, auser.password, history);
        // setTimeout(() => {
        //     fetchuser();
        //    }, 2000);


    }
    const log = (e) => {
        e.preventDefault();

        history('/signin')
    }
    return (
        <div>
            <div className="container" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="row justify-content-center">
                    <div className="col-md-5 mt-5 mb-2">
                        <div className="container mt-3" style={{ border: "2px solid black", borderRadius: "4px", backgroundColor: "#003049", height: "300px" }}>
                            <div className="row">
                                <div className="col-md-12 p-0 bg-primary text-center">
                                    <div>
                                        <h2>login</h2>
                                    </div>
                                </div>

                                <div className="col-md-12 pt-3">
                                    <form action="" onSubmit={oncllick}>

                                        <div className="form-group ">

                                            <input type="email" className="form-control form-control-lg my-2" name="email" id="email" onChange={onChange} placeholder="Enter  email " />
                                            <input type="password" className="form-control form-control-lg my-2" name="password" id="password" onChange={onChange} placeholder="Enter password" />

                                            <button type='submit' className="btn  btn-lg btn-primary my-2 form-control">Login</button>

                                        </div>
                                    </form>
                                    {/* <!-- <div className="d-grid gap-2  mx-auto">
                                        <button className="btn  btn-lg btn-primary my-2"> login</button>
                                    </div> --> */}
                                    <Link className='text-white d-flex justify-content-center mt-2' onClick={log} >create Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Log

