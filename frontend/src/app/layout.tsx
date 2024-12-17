"use client";

import React, { useState } from "react";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Navbar from "./(DashboardLayout)/navbar/Navbar";
import Sidebar from "./(DashboardLayout)/sidebar/Sidebar";
import theme from "@/styles/theme";
import Home from "./components/Home/Home";
import Setting from "./components/Settings/Setting";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activePage, setActivePage] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <Home />;
      case "Setting":
        return <Setting />;
      default:
        return <Home />;
    }
  };

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            {/* Sidebar */}
            <Box
              sx={{
                width: "250px",
                flexShrink: 0,
              }}
            >
              <Sidebar
                onMenuClick={setActivePage}
                isSidebarOpen={sidebarOpen}
                onCloseSidebar={() => setSidebarOpen(false)}
              />
            </Box>

            {/* Main Content */}
            <Box
              sx={{
                flexGrow: 1,
                transition: "margin-left 0.3s ease",
                overflowY: "auto",
              }}
            >
              {/* Navbar */}
              <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
              <Box sx={{ padding: "20px" }}>{renderPage()}</Box>
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
