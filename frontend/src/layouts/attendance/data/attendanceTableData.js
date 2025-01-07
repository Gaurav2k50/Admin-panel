/* eslint-disable react/prop-types */

import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";
import { useEffect, useState } from "react";
import MDTypography from "components/MDTypography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Select, MenuItem } from "@mui/material";

export default function AttendanceTableData() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/employees/list");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const Profile = ({ image }) => {
    const baseURL = "http://localhost:5001";
    return (
      <MDBox display="flex" flexDirection="column" alignItems="center" lineHeight={1}>
        <MDAvatar src={`${baseURL}${image}`} size="md" />
      </MDBox>
    );
  };

  const Employee = ({ name }) => {
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    );
  };

  const Designation = ({ designation }) => {
    return (
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {designation}
        </MDTypography>
      </MDBox>
    );
  };

  const Department = ({ department }) => {
    return (
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {department}
        </MDTypography>
      </MDBox>
    );
  };

  const Task = ({ task }) => {
    return (
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {task}
        </MDTypography>
      </MDBox>
    );
  };

  const StatusDropdown = ({ currentStatus, onChange }) => {
    const [status, setStatus] = useState(currentStatus);

    const handleChange = (event) => {
      const selectedStatus = event.target.value;
      setStatus(selectedStatus);
      onChange(selectedStatus);
    };

    return (
      <Select
        value={status}
        onChange={handleChange}
        size="small"
        displayEmpty
        sx={{ width: "120px" }}
      >
        <MenuItem value="Present">Present</MenuItem>
        <MenuItem value="Absent">Absent</MenuItem>
        <MenuItem value="Medical Leave">Medical Leave</MenuItem>
        <MenuItem value="Work from Home">Work from Home</MenuItem>
      </Select>
    );
  };

  const rows = employees.map((employee) => ({
    profile: <Profile image={employee.profile} />,
    employeeName: <Employee name={employee.employeeName} />,
    designation: <Designation designation={employee.position} />,
    // department: (
    //   <MDBox ml={-1}>
    //     <MDBadge badgeContent={employee.department} color="success" variant="gradient" size="sm" />
    //   </MDBox>
    // ),
    department: <Department department={employee.department} />,
    task: <Task task={employee.task} />,
    status: (
      <MDBox>
        <StatusDropdown
          currentStatus={employee.status || "Present"}
          onChange={(newStatus) => {
            console.log(`Status for ${employee.employeeName} updated to: ${newStatus}`);
          }}
        />
      </MDBox>
    ),

    action: (
      <MDBox display="flex" justifyContent="center" gap={0}>
        <IconButton>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "Profile", accessor: "profile", width: "45%", align: "left" },
      { Header: "Employee", accessor: "employeeName", width: "45%", align: "left" },
      { Header: "Designation", accessor: "designation", align: "left" },
      { Header: "Department", accessor: "department", align: "center" },
      { Header: "Task", accessor: "task", width: "45%", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
  };
}
