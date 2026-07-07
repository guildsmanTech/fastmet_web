import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import 'react-phone-input-2/lib/style.css';
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
