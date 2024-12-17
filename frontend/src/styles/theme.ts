import { createTheme } from "@mui/material/styles";

// You can customize the theme here
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Set your primary color
    },
    secondary: {
      main: "#dc004e", // Set your secondary color
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Set your font family
  },
});

export default theme;
