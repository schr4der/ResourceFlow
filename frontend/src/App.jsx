import React, { useState, useEffect } from "react";
import LandingPage from "./Components/LandingPage";
import AddingPage from "./Components/AddingPage";
import RequestingPage from "./Components/RequestingPage";
import Dashboard from "./Components/DashboardPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Check if there's a user in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear the user data from localStorage and state
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="App">
      <Router>
        <NavBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/addingpage" element={<AddingPage />} />
          <Route exact path="/requestpage" element={<RequestingPage />} />
          <Route exact path="/dashboardpage" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
