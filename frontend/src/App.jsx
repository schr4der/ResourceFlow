import React from "react";
import LandingPage from "./Components/LandingPage";
import AddingPage from "./Components/AddingPage";
import RequestingPage from "./Components/RequestingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/addingpage" element={<AddingPage />} />
          <Route exact path="/addingpage" element={<AddingPage />} />
          <Route exact path="/requestpage" element={<RequestingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
