import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = ({
  onMenuClick,
  isSidebarOpen,
  onCloseSidebar,
}: {
  onMenuClick: (page: string) => void;
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
}) => {
  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        background: "linear-gradient(to bottom, #003366, #00509e)",
        color: "#fff",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        padding: "16px",
        position: { xs: "fixed", md: "sticky" },
        top: 0,
        left: isSidebarOpen ? 0 : "-250px",
        transition: "left 0.3s ease",
        zIndex: 1200,
        display: { xs: isSidebarOpen ? "block" : "none", md: "block" },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          paddingBottom: "14px",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          My Dashboard
        </Typography>
        <IconButton
          onClick={onCloseSidebar}
          edge="end"
          aria-label="close"
          sx={{
            color: "#fff",
            display: { xs: "block", md: "none" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation List */}
      <List>
        <ListItem
          onClick={() => onMenuClick("Home")}
          sx={{
            marginBottom: "8px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
            borderRadius: "8px",
          }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          onClick={() => onMenuClick("Setting")}
          sx={{
            marginBottom: "8px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
            borderRadius: "8px",
          }}
        >
          <ListItemIcon>
            <SettingsIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
