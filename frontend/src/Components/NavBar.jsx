import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.leftNav}>
                <Link to="/" style={styles.link}>Home</Link>
            </div>
            <div style={styles.rightNav}>
                <Link to="/addingpage" style={styles.link}>Add</Link>
                <Link to="/requestpage" style={styles.link}>Request</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#29660C', // Dark green color
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
    },
    leftNav: {
        flex: 1,
    },
    rightNav: {
        display: 'flex',
        gap: '20px', // Space between buttons
    },
    link: {
        color: 'white', // White text color
        textDecoration: 'none',
        fontSize: '18px',
        padding: '8px 16px',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
    },
    linkHover: {
        backgroundColor: '#1e4e0a', // Slightly darker green on hover
    },
};

export default NavBar;
