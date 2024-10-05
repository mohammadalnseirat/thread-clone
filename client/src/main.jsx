
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";

// DARK AND LIGHT MODE:
const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.900", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#101010")(props),
    },
  }),
};

// config:
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

// colors:
const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};

// theme:
const theme = extendTheme({ config, styles, colors });

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
