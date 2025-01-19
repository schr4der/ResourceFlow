import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./DashboardPage.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [requested, setRequested] = useState([]);
  const [donated, setDonated] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Check if there's a user in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchMatches = async () => {
      try {
        const response = await fetch("http://localhost:8080/match");
        const data = await response.json();
        console.log("Fetched Matches:", data); // Log the response for debugging
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    const fetchRequestors = async () => {
      try {
        const response = await fetch("http://localhost:8080/requested-items");
        const data = await response.json();
        console.log("Fetched requested:", data);
        setRequested(data);
      } catch (error) {
        console.error("Error fetching Requested", error);
      }
    };

    const fetchDonators = async () => {
      try {
        const response = await fetch("http://localhost:8080/donated-items");
        const data = await response.json();
        console.log("Fetched donated:", data);
        setDonated(data);
      } catch (error) {
        console.error("Error fetching donated", error);
      }
    };

    fetchMatches();
    fetchRequestors();
    fetchDonators();
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

  return (
    <div style={styles.container}>
      {!user ? (
        <div style={styles.signInContainer}>
          <h1 style={styles.message}>Sign in to access your dashboard</h1>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      ) : (
        <div style={styles.dashboardContainer}>
          <h1 style={styles.message}>Welcome {user.name}!</h1>

          <div className="tables">
            {/* Requested Table */}
            <div className="requesterTable">
              <h2>Requested Items</h2>
              {requested.length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Requester</th>
                      <th style={styles.th}>Item</th>
                      <th style={styles.th}>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requested.map((request, index) => (
                      <tr
                        key={index}
                        style={{
                          ...(index % 2 === 0 ? styles.rowEven : styles.rowOdd),
                          backgroundColor:
                            hoveredItem === request.item_name ? "#f0e68c" : "", // Highlight on hover
                        }}
                        onMouseEnter={() => setHoveredItem(request.item_name)} // Hover event
                        onMouseLeave={() => setHoveredItem(null)} // Remove highlight on leave
                      >
                        <td style={styles.td}>{request.person_name}</td>
                        <td style={styles.td}>{request.item_name}</td>
                        <td style={styles.td}>{request.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={styles.noMatches}>No requested items found</p>
              )}
            </div>

            {/* Matches Table */}
            <div className="matchTable">
              <h2>Matches</h2>
              {matches.length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Requester</th>
                      <th style={styles.th}>Donator</th>
                      <th style={styles.th}>Item</th>
                      <th style={styles.th}>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches
                      .filter(
                        (match) => match.person1_name !== match.person2_name
                      )
                      .map((match, index) => (
                        <tr
                          key={index}
                          style={{
                            ...(index % 2 === 0
                              ? styles.rowEven
                              : styles.rowOdd),
                            backgroundColor:
                              hoveredItem === match.item_name ? "#f0e68c" : "", // Highlight on hover
                          }}
                          onMouseEnter={() => setHoveredItem(match.item_name)} // Hover event
                          onMouseLeave={() => setHoveredItem(null)} // Remove highlight on leave
                        >
                          <td style={styles.td}>{match.person1_name}</td>
                          <td style={styles.td}>{match.person2_name}</td>
                          <td style={styles.td}>{match.item_name}</td>
                          <td style={styles.td}>{match.quantity}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p style={styles.noMatches}>No matches found</p>
              )}
            </div>

            {/* Donated Table */}
            <div className="donatorTable">
              <h2>Donated Items</h2>
              {donated.length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Donator</th>
                      <th style={styles.th}>Item</th>
                      <th style={styles.th}>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donated.map((donation, index) => (
                      <tr
                        key={index}
                        style={{
                          ...(index % 2 === 0 ? styles.rowEven : styles.rowOdd),
                          backgroundColor:
                            hoveredItem === donation.item_name ? "#f0e68c" : "", // Highlight on hover
                        }}
                        onMouseEnter={() => setHoveredItem(donation.item_name)} // Hover event
                        onMouseLeave={() => setHoveredItem(null)} // Remove highlight on leave
                      >
                        <td style={styles.td}>{donation.person_name}</td>
                        <td style={styles.td}>{donation.item_name}</td>
                        <td style={styles.td}>{donation.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={styles.noMatches}>No donated items found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
  },
  signInContainer: {
    textAlign: "center",
  },
  dashboardContainer: {
    textAlign: "center",
    padding: "20px",
  },
  message: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  table: {
    width: "80%",
    margin: "20px auto",
    borderCollapse: "collapse",
    textAlign: "left",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  th: {
    padding: "12px",
    backgroundColor: "#29660C",
    color: "white",
    border: "1px solid #ddd",
    textAlign: "center",
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
    fontSize: "16px",
    color: "#333",
  },
  rowOdd: {
    backgroundColor: "#f9f9f9",
  },
  rowEven: {
    backgroundColor: "#fefefe",
  },
  noMatches: {
    margin: "20px 0",
    fontSize: "18px",
    color: "#777",
  },
};

export default Dashboard;
