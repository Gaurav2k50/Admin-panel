import React from "react";
import { Box, Button, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function AddAttandancePopup() {
  const departmentOptions = ["HR", "Engineer", "Marketing"];

  // Define the handleSearchChange function
  const handleSearchChange = (searchValue) => {
    console.log("Search value:", searchValue);
  };

  return (
    <Box mt={4} ml={2.5} mr={2.5} display="flex" justifyContent="space-between" alignItems="center">
      {/* Dropdown */}
      <Box display="flex" gap={2}>
        <Select
          defaultValue=""
          displayEmpty
          variant="outlined"
          size="small"
          sx={{
            height: 30, // Same height as the Search TextField
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
      </Box>
      {/* Search Field */}
      <Box display="flex" alignItems="center" gap={2}>
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
          sx={{ height: 40 }}
        />
      </Box>
    </Box>
  );
}
