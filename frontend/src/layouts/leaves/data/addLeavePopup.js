import { Box, Button, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function AddLeavePopup() {
  const departmentOptions = ["HR", "Engineer", "Marketing"];

  const handleSearchChange = (searchValue) => {
    console.log("Search value:", searchValue);
  };

  const handleAddNewClick = () => {
    console.log("Add New Candidate clicked!");
  };
  return (
    <Box mt={4} ml={2.5} mr={2.5}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          <Select
            defaultValue=""
            displayEmpty
            variant="outlined"
            size="small"
            sx={{
              height: 30,
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <MenuItem value="">Approved</MenuItem>
            {departmentOptions.map((dept, index) => (
              <MenuItem key={index} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </Box>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewClick}
            sx={{
              height: 40,
              backgroundColor: "#358FEE",
              color: "#FFFFFF", // Ensures the text color is white
            }}
          >
            Add New Leave
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
