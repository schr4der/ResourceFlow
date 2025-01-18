import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav style={styles.navbar}>
            <div className="rightNavBar" style={styles.navLinks}>
                <Link to="/" className="link" style={styles.link}>Home</Link>
                <Link to="/addingpage" className="link" style={styles.link}>Add</Link>
                <Link to="/requestpage" className="link" style={styles.link}>Request</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#007BFF',  // Blue background
        padding: '10px 20px',        // Padding for spacing
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
    },
    navLinks: {
        display: 'flex',
        justifyContent: 'center',  // Center the links
        alignItems: 'center',
        gap: '20px',               // Space between links
    },
    link: {
        color: 'white',            // White text color
        textDecoration: 'none',    // Remove underline
        fontSize: '18px',          // Font size
        padding: '8px 16px',       // Padding for clickable area
        borderRadius: '4px',       // Rounded corners
        transition: 'background-color 0.3s ease', // Smooth transition on hover
    },
    linkHover: {
        backgroundColor: '#0056b3', // Darker blue on hover
    }
};

export default NavBar;
