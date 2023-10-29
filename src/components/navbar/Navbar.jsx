import React from "react";
import "./navbar.scss"
import logo from "../../assets/apex.webp"
import { Link } from "react-router-dom";

const Navbar = () => {
  
  return (
    <div className="navbar">
      <div className="right">
          <img src={logo}  />
          <h1 style={{color: "#30cfd0"}}>Apex-Swap</h1>
      </div>
      <div className="input">
        <input 
        type="text" 
        placeholder="Type to search..."
        />
      </div>
      <div className="left">
        <>
          {/* <Link to="/login"> */}
            {/* <button>Login</button> */}
          {/* </Link> */}
          {/* <Link to="/register"> */}
            {/* <button>SignUp</button> */}
          {/* </Link> */}
        </>
        
        
      </div>
    </div>
  )
}

export default Navbar