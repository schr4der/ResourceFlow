import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const NavBar = () => {
    return (
      <nav>
            <div className="rightNavBar">
              <Link to="/" className="link">Home</Link>
              <br/>
              <Link to="/addingpage" className="link">Add </Link>
              <br/>
              <Link to="/requestpage" className="link">Request </Link>
    
              </div>
      </nav>
    );
  }
  
export default NavBar;