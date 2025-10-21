import React from "react";
import { Routes, Route} from 'react-router-dom'; 

// Importaciones de Páginas
import Home from "./pages/Home";
import LoginPage from "./pages/LoginRegister"; 
import Favs from "./pages/Favs";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import MyComments from "./pages/MyComments";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} /> 
      <Route path="/home" element={<Home />} /> 
      <Route path="/favoritos" element={<Favs />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/mis-comentarios" element={<MyComments />} />
      <Route path="/book/:id" element={<BookDetailsPage />} />
     
      
      {/* Ruta principal de administración */}
      <Route path="/dashboard" element={<DashboardPage />} />
   

      
      {/* Ruta 404 debe ir al final */}
      <Route path="*" element={<div>Página no encontrada (404)</div>} />
    </Routes>
  );
}

export default App;