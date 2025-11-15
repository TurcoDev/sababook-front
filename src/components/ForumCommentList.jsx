
import React from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { useForumComments } from "../hooks/useForumComments";

const ForumCommentList = ({ foroId, theme }) => {
  const { comments, loading, error } = useForumComments(foroId);

  return (
    <Box textAlign="left" mt={2}>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Comentarios
      </Typography>
      {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      {!loading && Array.isArray(comments) && comments.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Aún no hay comentarios.
        </Typography>
      )}
      {comments.map((comment) => (
        <Paper
          key={comment.id || comment.comentario_id}
          variant="outlined"
          sx={{
            p: 1.5,
            my: 2,
            borderRadius: "12px",
            bgcolor: theme?.palette?.common?.white,
            border: `1px solid ${theme?.palette?.grey?.[300]}`,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {comment.usuario?.nombre || comment.usuario_nombre || "Usuario"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {comment.usuario?.rol || comment.usuario_rol || ""}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {comment.fecha}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            mt={1}
            sx={{ fontStyle: "italic", color: theme?.palette?.text?.primary }}
          >
            {comment.comentario}
          </Typography>
          {comment.destacado && (
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{
                  color: "#FF6633",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                }}
              >
                Comentario destacado
              </Typography>
            </Box>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default ForumCommentList;
