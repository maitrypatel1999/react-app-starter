import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import PersonList from "./components/PersonList";
import AddPerson from "./components/AddPerson";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Maitry Patel
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addTutorial"} className="nav-link">
              Add Tutorial
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/person"} className="nav-link">
              Person
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addPerson"} className="nav-link">
              Add Person
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TutorialsList/>} />
          <Route path="/person" element={<PersonList/>} />
          <Route path="/addPerson" element={<AddPerson/>} />
          <Route path="/addPerson/:id" element={<AddPerson/>} />
          <Route path="/tutorials" element={<TutorialsList/>} />
          <Route path="/addTutorial" element={<AddTutorial/>} />
          <Route path="/tutorials/:id" element={<Tutorial/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
