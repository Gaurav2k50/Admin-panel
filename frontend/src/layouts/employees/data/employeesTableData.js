/* eslint-disable react/prop-types */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import moment from "moment";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useEffect, useState } from "react";
import { position } from "stylis";

export default function EmployeesTableData() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/employee/allEmployee");
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

  const Employee = ({ name }) => (
    <MDBox lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  const Email = ({ email }) => (
    <MDBox display="flex" flexDirection="column" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  );

  const Phone = ({ phone }) => (
    <MDBox display="flex" flexDirection="column" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{phone}</MDTypography>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption" fontWeight="small">
        {description}
      </MDTypography>
    </MDBox>
  );

  const handleEdit = (employee) => {
    console.log("Edit employee:", employee);
    // Set the form's initial values to the selected employee's data
    // formik.setValues({
    //   employeeName: employee.employeeName,
    //   email: employee.email,
    //   phone: employee.phone,
    //   department: employee.department,
    //   position: employee.position,
    //   date: employee.dateOfJoining,
    //   image: null,
    // });
  };

  const handleDelete = (id) => {
    console.log("Delete employee with ID:", id);
  };

  const rows = employees.map((employee) => ({
    profile: <Profile image={employee.profile} />,
    author: <Employee name={employee.employeeName} />,
    email: <Email email={employee.email} />,
    phone: <Phone phone={employee.phone} />,
    position: <Job title={employee.position} />,
    department: (
      <MDBox ml={-1}>
        <MDBadge badgeContent={employee.department} color="success" variant="gradient" size="sm" />
      </MDBox>
    ),
    date: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {moment(employee.dateOfJoining).format("MMMM Do YYYY")}
      </MDTypography>
    ),
    action: (
      <MDBox display="flex" justifyContent="center" gap={0}>
        <IconButton color="primary" onClick={() => handleEdit()}>
          <DriveFileRenameOutlineIcon fontSize="small" />
        </IconButton>
        <IconButton color="secondary" onClick={() => handleDelete(employee.id)}>
          <DeleteForeverIcon fontSize="small" />
        </IconButton>
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "Profile", accessor: "profile", width: "20%", align: "center" },
      { Header: "Employee Name", accessor: "author", width: "25%", align: "left" },
      { Header: "Email Address", accessor: "email", width: "20%", align: "center" },
      { Header: "Phone Number", accessor: "phone", width: "15%", align: "center" },
      { Header: "Position", accessor: "position", align: "left" },
      { Header: "Department", accessor: "department", align: "center" },
      { Header: "Date of Joining", accessor: "date", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows,
  };
}
