import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store";

// Hooks
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastProvider } from "./components/toasts/ToastProvider.tsx";
import ErrorBoundary from "./components/errorBoundary/index.tsx";

// Pages
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import ProfilePage from "./pages/profile/index.tsx";
import TimeSheetPage from "./pages/timeSheet/index.tsx";
import AdminPage from "./pages/admin/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <ToastProvider autoClose={true} duration={3000}>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="timesheet" element={<TimeSheetPage />} />
                <Route path="admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </ToastProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
