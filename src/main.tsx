import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { PlatformProvider } from "./lib/platform";
import { ThemeProvider } from "./lib/theme";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// 플랫폼/테마 컨텍스트를 BrowserRouter 안쪽에 배치하여 라우트 변화에 즉시 반응하도록 구성합니다.
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlatformProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PlatformProvider>
    </BrowserRouter>
  </React.StrictMode>
);
