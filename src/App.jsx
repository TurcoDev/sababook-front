import React from "react";
import { Routes, Route } from 'react-router-dom'; 
import Home from "./pages/Home";
import LoginPage from "./pages/LoginRegister"; 
import Favs from "./pages/Favs";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import BookTable from './components/BookTable';      
import EditBookForm from './components/EditBookForm';
import UserTable from './components/UserTable'; 
import ForumTable from './components/ForumTable';

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
      
     
      {/* RUTA PADRE: Mantiene el layout (Header y Menú) */}
      <Route path="/dashboard" element={<DashboardPage/>}> 
        
        {/* RUTA HIJA: Carga la tabla de Usuarios (default/index) */}
        <Route index element={<UserTable />} /> 
        <Route path="usuarios" element={<UserTable />} /> 
        
        {/* RUTA HIJA: Carga directamente la tabla de Libros */}
        <Route path="libros" element={<BookTable />} /> 

        {/* RUTA HIJA: Carga directamente la tabla de Foros */}
        <Route path="foros" element={<ForumTable />} /> 
      </Route>
      
      {/* RUTA DE EDICIÓN INDEPENDIENTE (Sin layout del dashboard) */}
      <Route path="/dashboard/libros/editar/:bookId" element={<EditBookForm />} />
      <Route path="*" element={<div>Página no encontrada (404)</div>} />
    </Routes>
  );
}

export default App;