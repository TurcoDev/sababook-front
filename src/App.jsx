import React from "react";

import { Routes, Route} from 'react-router-dom'; 
import Home from "./pages/Home";
import LoginPage from "./pages/LoginRegister"; 
import Favs from "./pages/Favs";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import MyComments from "./pages/MyComments";


import BookFormPage from "./components/EditBookForm"; // Asume que este es el componente del formulario


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} /> 
      <Route path="/home" element={<Home />} /> 
      <Route path="/favoritos" element={<Favs />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/mis-comentarios" element={<MyComments />} />
      <Route path="/book/:id" element={<BookDetailsPage />} />
     
      
          <Route path="/dashboard" element={<DashboardPage />} />
   
        <Route 
          path="/libros/editar/:id" 
          element={<BookFormPage isEditing={true} />} 
      />
      
      {/* 💡 Opcional: Ruta para crear un nuevo libro de nivel superior */}
      <Route 
          path="/libros/crear" 
          element={<BookFormPage isEditing={false} />} 
      />
      
      {/* Ruta 404 debe ir al final */}
      <Route path="*" element={<div>Página no encontrada (404)</div>} />
    </Routes>
  );
}

export default App;