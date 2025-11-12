
import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import NavButton from "../components/NavButton";

const ORANGE_COLOR = "#FF6633";

const BookOpinionList = ({ opinions, theme, handleViewCommentsClick }) => {
  return (
    <Box textAlign="left" mt={2}>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Descripción
      </Typography>

      {Array.isArray(opinions) && opinions.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Aún no hay opiniones.
        </Typography>
      )}

      {opinions?.map((opinion) => (
        <Box
          key={opinion?.id ?? Math.random()}
          sx={{
            p: 1.5,
            my: 3,
            borderRadius: "12px",
            bgcolor: theme?.palette?.common?.white,
            border: `1px solid ${theme?.palette?.grey?.[300]}`,
            boxShadow: "none",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {opinion?.usuario?.nombre || (opinion?.usuario_id ? `Usuario #${opinion.usuario_id}` : "Usuario desconocido")}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {opinion?.usuario?.rol || ""}
              </Typography>
            </Box>
            <Rating value={opinion?.calificacion || 0} readOnly size="small" />
          </Box>

          <Typography
            variant="body2"
            mt={1}
            sx={{ fontStyle: "italic", color: theme?.palette?.text?.primary }}
          >
            {opinion?.comentario || ""}
          </Typography>

          <Box display="flex" justifyContent="flex-end" mt={1}>
            {opinion?.destacado && (
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{
                  color: ORANGE_COLOR,
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                }}
              >
                Comentario destacado
              </Typography>
            )}
          </Box>
        </Box>
      ))}

      <NavButton
        onClick={handleViewCommentsClick}
        variant="outlined"
        sx={{
          width: "100%",
          mt: 3,
          p: "12px 20px",
          borderColor: ORANGE_COLOR + " !important",
          color: ORANGE_COLOR + " !important",
          fontWeight: "bold",
          borderRadius: "8px !important",
          boxShadow: `0 2px 5px rgba(255, 102, 51, 0.1)`,
          "&:hover": {
            bgcolor: theme?.palette?.grey?.[50] + " !important",
            borderColor: ORANGE_COLOR + " !important",
          },
        }}
      >
        Ver todos los comentarios
      </NavButton>
    </Box>
  );
};

export default BookOpinionList;
