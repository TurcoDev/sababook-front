//Implementacion de Routes: npm install react-router-dom
import React from "react";
import { Routes, Route } from 'react-router-dom'; 
import Home from "./pages/Home";
import LoginPage from "./pages/LoginRegister"; 
import Favs from "./pages/Favs";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} /> 
      <Route path="/home" element={<Home />} /> 
      <Route path="/favoritos" element={<Favs />} />
          <Route path="/perfil" element={<Profile />} />
      <Route path="*" element={<div>Página no encontrada (404)</div>} />

    </Routes>
  );
}

export default App;