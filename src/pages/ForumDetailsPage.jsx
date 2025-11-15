import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Divider,
  CircularProgress,
  useTheme,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import AppHeader from "../components/AppHeader";
import SideMenu from "../components/SideMenu";
import { useParams } from "react-router-dom";
import { useForums } from "../hooks/useForum";
import ForumCommentList from "../components/ForumCommentList";

const ForumDetailsPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { forums, loading, error } = useForums();
  const foro = forums.find((f) => String(f.foro_id) === String(id));
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[50],
        p: { xs: 2, md: 4 },
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <AppHeader
        onMenuClick={() => setMenuOpen(true)}
        title="DETALLE DEL FORO"
        subtitle="Detalles y comentarios"
      />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} active="Foro" />
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {!loading && !error && !foro && (
        <Typography>No se encontró el foro.</Typography>
      )}
      {!loading && !error && foro && (
        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: "16px", mb: 4 }}>
          <Box display="flex" alignItems="flex-start" gap={2}>
            <Avatar
              variant="rounded"
              sx={{
                width: 60,
                height: 60,
                mr: 2,
                border: "1px solid #ddd",
                bgcolor: "#f0f0f0",
              }}
            >
              <ForumIcon fontSize="large" />
            </Avatar>
            <Box flexGrow={1} textAlign="left">
              <Typography variant="body1" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
                {foro.titulo}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={1}>
                {foro.descripcion}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Creado por: {foro.usuario_nombre || "Usuario"}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 3 }} />
          <ForumCommentList foroId={foro.foro_id} theme={theme} />
        </Paper>
      )}
    </Box>
  );
};

export default ForumDetailsPage;
