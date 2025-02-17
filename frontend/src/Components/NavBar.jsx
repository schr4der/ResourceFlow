import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ user, onLogout }) => {
  return (
    <nav style={styles.navbar}>
      <div className="leftNavBar" style={styles.navLinks}>
        <Link to="/" className="link" style={styles.link}>
          ResourceFlow
        </Link>
      </div>
      <div className="rightNavBar" style={styles.navLinks}>
        <Link to="/addingpage" className="link" style={styles.link}>
          Donate
        </Link>
        <Link to="/requestpage" className="link" style={styles.link}>
          Request
        </Link>

        <Link to="/dashboardpage" className="link" style={styles.link}>
          Dashboard
        </Link>

        {user && (
          <button onClick={onLogout} style={styles.logoutButton}>
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    padding: "10px 20px", // Padding for spacing
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLinks: {
    display: "flex",
    gap: "20px", // Space between links
    alignItems: "center",
  },
  link: {
    color: "black", // White text color
    textDecoration: "none", // Remove underline
    fontSize: "28px", // Font size
    padding: "8px 16px", // Padding for clickable area
    borderRadius: "4px", // Rounded corners
    transition: "background-color 0.3s ease",
    fontWeight: "bold",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#29660C",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default NavBar;
