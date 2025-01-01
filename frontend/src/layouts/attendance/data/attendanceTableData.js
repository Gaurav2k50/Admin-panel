/* eslint-disable react/prop-types */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import Employees from "layouts/employees";

export default function attendanceTableData() {
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

  const Task = ({ task }) => {
    return (
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {task}
        </MDTypography>
      </MDBox>
    );
  };

  const rows = employees.map((employee) => ({
    profile: <Profile image={employee.profile} />,
    employeeName: <Employee name={employee.employeeName} />,
    designation: <Designation designation={employee.position} />,
    department: (
      <MDBox ml={-1}>
        <MDBadge badgeContent={employee.department} color="success" variant="gradient" size="sm" />
      </MDBox>
    ),
    task: <Task task={employee.task} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      </MDBox>
    ),

    action: (
      <MDBox display="flex" justifyContent="center" gap={0}>
        <IconButton>
          <DriveFileRenameOutlineIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <DeleteForeverIcon fontSize="small" />
        </IconButton>
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "Profile", accessor: "profile", width: "45%", align: "left" },
      { Header: "Employee", accessor: "employeeName", width: "45%", align: "left" },
      { Header: "Designation", accessor: "designation", align: "left" },
      { Header: "Department", accessor: "department", width: "45%", align: "center" },
      { Header: "Task", accessor: "task", width: "45%", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
  };
}
