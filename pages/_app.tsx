import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppWrapper from "../controllers/AppWrapper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFBA00",
    },
  },
  typography: {
    fontFamily: "Open Sans",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </ThemeProvider>
  );
}
