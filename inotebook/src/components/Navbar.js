import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const Navbar = () => {
  const user = useContext(noteContext);
  const { fetchuser } = user;
  const history = useNavigate();
  let location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      fetchuser();
    }, 3000);
    // eslint-disable-next-line
  }, []);
  const logout = () => {
    history('/login')
    localStorage.removeItem('tokenu');
  }

  const fet = () => {
    history('/usershow');
  }


  return (
    <div className='mb-5'>
      <div className="container fixed-top">
        <div className="row d-md-flex">
          <div className="col-md-3 col-12 border bg-light order-md-1">
            <div className="navbar">
              <h2 className='m-auto text-primary'>inotebook</h2>

            </div>
          </div>

          <div id="navbar" className="col-6 d-block d-md-none navbar bg-light ">


            <button className="btn mx-2  navbar-toggler  mr-auto bg-primary" data-toggle="collapse" data-target="#navebar">
              <span className="navbar-toggler-icon  float-left"><i className="fas fa-bars" style={{ color: "#00b4d8", fontSize: "28px" }}></i></span>
            </button>

          </div>
          <div className="col-6 col-md-4 d-flex navbar m-0 justify-content-end bg-light order-md-3">
            {!localStorage.getItem('tokenu') ? <div>

              <button className='btn btn-primary mx-1'  ><Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} aria-current="page" to="/login">login</Link></button>
              <button className='btn btn-primary mx-1' ><Link className={`nav-link ${location.pathname === "/signin" ? "active" : ""}`} aria-current="page" to="/signin">SignUp</Link></button>
            </div> : <div>

              <button className='btn btn-primary' onClick={logout}>logout</button>

              <i className=" fa-solid fa-user border p-2 m-2" onClick={fet}  ></i>


            </div>
            }
          </div>

          <div className="col-6 col-md-5 bg-light order-md-2 p-0 mt-1">
            <div className="navbar navbar-expand-md p-0">

              <div className="collapse navbar-collapse  w-100 p-0" id="navebar">

                <ul className="navbar-nav text-center">
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link  ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                  </li>


                </ul>
              </div>
            </div>

          </div>







        </div>
      </div>
    </div>
  );
}

export default Navbar;

