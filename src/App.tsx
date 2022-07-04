import React from 'react';
import LoginForm from "./LoginForm"
import './App.css'; 

import {Route, Routes} from "react-router-dom" 
import Home from "./Home"

function App() {
  return (
    <>
    <Routes>
    <Route path="/login" element={<LoginForm  />} />
    <Route path="/" element={<Home />} />

    </Routes>
    
   
    
    </>
    
  );
}

export default App;
