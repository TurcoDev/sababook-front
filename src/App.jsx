import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import LoginPage from "./pages/LoginRegister";
import Favs from "./pages/Favs";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import BookPreview from "./pages/BookPreview";
import MyComments from "./pages/MyComments";
import BookFormPage from "./components/EditBookForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookPreview book={{
        titulo: "La Campana de Cristal",
        autor: "Sylvia Plath",
        descripcion: "Una novela semiautobiográfica que narra la experiencia de una joven brillante enfrentando una profunda crisis existencial y emocional.",
        portada_url: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg",
        rating: 4.2,
        id: 1
      }} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/favoritos" element={<Favs />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/mis-comentarios" element={<MyComments />} />
      <Route path="/book/:id" element={<BookDetailsPage />} />
      <Route path="/book-preview/:id" element={<BookPreview />} />
      {/* Ruta temporal para testing */}
      <Route path="/preview-test" element={<BookPreview book={{
        titulo: "La Campana de Cristal",
        autor: "Sylvia Plath",
        descripcion: "Una novela semiautobiográfica que narra la experiencia de una joven brillante enfrentando una profunda crisis existencial y emocional.",
        portada_url: "https://via.placeholder.com/300x400/FF6633/FFFFFF?text=La+Campana+de+Cristal",
        rating: 4.2,
        id: 1
      }} />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/libros/editar/:id" element={<BookFormPage isEditing={true} />} />
      <Route path="/libros/crear" element={<BookFormPage isEditing={false} />} />
      <Route path="*" element={<div>Página no encontrada (404)</div>} />
    </Routes>
  );
}

export default App;
