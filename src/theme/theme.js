import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#653A1B", 
    },
    secondary: {
      main: "#36332D", // etiqeutas
    },
    button:{
        main:"#f25600"
    },
    body:{
        main:"#4A4C52"
    }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: {
      fontWeight: 700,
      color: "#653A1B", // Color primary para títulos h5
    },
    subtitle1: {
      fontWeight: 600,
      color: "#4A4C52", // Color body para subtítulos
    },
  },
});

export default theme;
