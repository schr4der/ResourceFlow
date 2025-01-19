import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Check if there's a user in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSuccess = (credentialResponse) => {
    // Extract the Google ID token from the credential response
    const decoded = jwtDecode(credentialResponse.credential);

    // Dynamically extract name and email
    const userInfo = {
      name: decoded.name,
      email: decoded.email,
    };

    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(userInfo));

    // Set the user in state
    setUser(userInfo);
    alert("You have signed in successfully!");
  };

  const handleError = () => {
    console.error("Login Failed");
    alert("Failed to sign in. Please try again.");
  };

  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem("user");

    // Reset the user state
    setUser(null);
  };

  return (
    <div style={styles.container}>
      {!user ? (
        <div style={styles.signInContainer}>
          <h1 style={styles.message}>Sign in to access your dashboard</h1>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      ) : (
        <div style={styles.dashboardContainer}>
          <h1 style={styles.message}>
            Welcome to your dashboard, {user.name}!
          </h1>
          <p style={styles.details}>Email: {user.email}</p>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  signInContainer: {
    textAlign: "center",
  },
  dashboardContainer: {
    textAlign: "center",
  },
  message: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  details: {
    fontSize: "18px",
    marginBottom: "20px",
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

export default Dashboard;
