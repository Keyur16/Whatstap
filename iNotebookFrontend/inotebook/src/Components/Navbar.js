import React, { useEffect } from 'react';
import { Link, useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

  const navigate = useNavigate();


  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');

  }

  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>    
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">

            <Link className="navbar-brand" to="/">Navbar</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/about" ? "": "active"}`} aria-current="page" to="/">Home</Link>
                </li>

                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/about" ? "active": ""}`} to="/about">About</Link>
                </li>

                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="/">Action</a></li>
                    <li><a className="dropdown-item" href="/">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="/">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="/">Disabled</a>
                </li> */}

              </ul>


              {!localStorage.getItem('token') ?
              <form className="d-flex" role="search">
                <a href="/login" className="btn btn-primary mx-2" role="button" >Login</a>
                <a href="/signup" className="btn btn-primary mx-2" role="button" >SignUp</a>
              </form> : <button className="btn btn-primary mx-2" onClick={handleLogout}>Log out</button>}

            </div>
          </div>
        </nav>
    </>
    
  )
}

export default Navbar
