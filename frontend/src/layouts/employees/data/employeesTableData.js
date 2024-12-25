/* eslint-disable react/prop-types */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function employeesTableData() {
  const handleEdit = (employee) => {
    openModal(employee);
  };
  const Profile = ({ image }) => (
    <MDBox display="flex" flexDirection="column" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} size="md" />
    </MDBox>
  );

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

    rows: [
      {
        profile: <Profile image={team2} />,
        author: <Employee name="John Michael" />,
        email: <Email email="john@creative-tim.com" />,
        phone: <Phone phone="123456783" />,
        position: <Job title="Manager" description="Organization" />,
        department: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Computer Science" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDBox display="flex" justifyContent="center" gap={0}>
            <IconButton color="primary" onClick={() => console.log("Edit clicked")}>
              <DriveFileRenameOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton color="secondary" onClick={() => console.log("Delete clicked")}>
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </MDBox>
        ),
      },
      {
        profile: <Profile image={team3} />,
        author: <Employee name="Alexa Liras" />,
        email: <Email email="alexa@creative-tim.com" />,
        phone: <Phone phone="123456783" />,
        position: <Job title="Programmer" description="Developer" />,
        department: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDBox display="flex" justifyContent="center" gap={0}>
            <IconButton color="primary" onClick={() => handleEdit(employee)}>
              <DriveFileRenameOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton color="secondary" onClick={() => console.log("Delete clicked")}>
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </MDBox>
        ),
      },
    ],
  };
}
