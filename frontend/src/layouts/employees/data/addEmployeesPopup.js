import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddEmployeesFormModal from "./addEmployeesFormModal";

export default function AddEmployeesPopup() {
  const departmentOptions = ["HR", "Engineering", "Marketing"];
  const statusOptions = ["Active", "Inactive"];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (searchValue) => {
    console.log("Search value:", searchValue);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNewClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Box mt={4} ml={2.5} mr={2.5}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        {/* Left Side: Two Dropdowns */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
            <Select
              defaultValue=""
              displayEmpty
              variant="outlined"
              size="small"
              sx={{
                height: 40,
                width: "100%",
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              {departmentOptions.map((dept, index) => (
                <MenuItem key={index} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>

            <Select
              defaultValue=""
              displayEmpty
              variant="outlined"
              size="small"
              sx={{
                height: 40,
                width: "100%",
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <MenuItem value="">Department</MenuItem>
              {statusOptions.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {/* Right Side: Search Box and Add New Candidate Button */}
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search"
              onChange={(e) => handleSearchChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 24 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ height: 40, width: "100%" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNewClick}
              sx={{
                height: 40,
                backgroundColor: "#358FEE",
                color: "#FFFFFF", // Ensures the text color is white
                width: "100%",
              }}
            >
              Add New Employee
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Modal  */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 800 },
            backgroundColor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <AddEmployeesFormModal closeModal={handleCloseModal} />
        </Box>
      </Modal>
    </Box>
  );
}
