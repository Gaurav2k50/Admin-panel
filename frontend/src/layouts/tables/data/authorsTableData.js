import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

export default function DataTable() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/v1/candidates")
      .then((response) => response.json())
      .then((data) => setCandidates(data))
      .catch((error) => console.error("Error fetching candidates:", error));
  }, []);

  // Handle candidate deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/v1/candidates/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete candidate");

      setCandidates(candidates.filter((candidate) => candidate._id !== id));
      toast.success("Candidate deleted successfully");
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast.error("Failed to delete candidate");
    }
  };

  // Show confirmation dialog
  const confirmDelete = (candidate) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete ${candidate.name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(candidate._id),
        },
        {
          label: "No",
        },
      ],
      overlayClassName: "custom-overlay-class",
    });
  };

  const columns = [
    { Header: "Sr no.", accessor: "srNo", width: "45%", align: "center" },
    { Header: "Candidates Name", accessor: "author", width: "45%", align: "center" },
    { Header: "Email Address", accessor: "email", width: "45%", align: "center" },
    { Header: "Phone Number", accessor: "phone", width: "45%", align: "center" },
    { Header: "Position", accessor: "function", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Experience", accessor: "experience", align: "center" },
    { Header: "Resume", accessor: "resume", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },
  ];

  const rows = candidates.map((candidate, index) => ({
    srNo: index + 1,
    author: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    function: candidate.department,
    status: <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />,
    experience: candidate.experience,
    resume: (
      <MDTypography
        component="a"
        href={candidate.resume}
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        <DownloadIcon fontSize="small" sx={{ marginRight: "5px" }} />
      </MDTypography>
    ),
    action: (
      <DeleteForeverIcon
        fontSize="small"
        sx={{ marginRight: "5px", cursor: "pointer" }}
        onClick={() => confirmDelete(candidate)}
      />
    ),
  }));

  return {
    columns,
    rows,
  };
}
