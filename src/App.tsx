import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { Button } from 'reactstrap';
import { Welcome } from './components/Welcome';
import './assets/base.scss';
import { Dashboard } from './pages/Dashboard';
import Lottie from 'react-lottie';

const App = () => {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
    <Router>
    <Routes>
      <Route path="/" element={<Welcome/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
  </Router>
  </div>
          
  );
};

export default App;
