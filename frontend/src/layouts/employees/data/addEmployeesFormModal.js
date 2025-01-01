import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Card, Grid, IconButton, TextField, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Extend dayjs with plugins
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isBetween from "dayjs/plugin/isBetween";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

export default function AddEmployeesFormModal({ closeModal }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState(null); // State for status messages

  const formik = useFormik({
    initialValues: {
      employeeName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      date: "",
      task: "",
      image: null,
    },
    validationSchema: Yup.object({
      employeeName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      department: Yup.string().required("Department is required"),
      position: Yup.string().required("Position is required"),
      date: Yup.date().required("Date is required"),
      task: Yup.string().required("Task is required"),
      image: Yup.mixed()
        .nullable()
        .test("fileRequired", "Profile picture is required", (value) => value !== null),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const form = new FormData();
      for (const key in values) {
        if (key === "image" && values[key]) {
          form.append("profilePicture", values[key]);
        } else {
          form.append(key, values[key]);
        }
      }

      setSubmitting(true);

      try {
        const response = await fetch("http://localhost:5001/api/v1/employees/add", {
          method: "POST",
          body: form,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to submit form");
        }

        setStatus({ success: "Employee added successfully!" });
        setTimeout(() => {
          closeModal();
        }, 1000);
      } catch (error) {
        setStatus({ error: `Error: ${error.message}` });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <MDBox pt={6} pb={3} sx={{ overflowY: "auto", maxHeight: "90vh" }}>
      {/* Close Button */}
      <IconButton
        onClick={closeModal}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "grey.500",
        }}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <MDBox p={3}>
              <MDTypography variant="h6" mb={3} fontWeight="400" color="text.primary">
                Choose Profile
              </MDTypography>

              {imagePreview ? (
                <Box
                  mt={0}
                  textAlign="center"
                  sx={{
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Uploaded Preview"
                    style={{
                      width: "165px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "2px solid #ddd",
                    }}
                  />
                </Box>
              ) : (
                <Box mt={-2} textAlign="center">
                  <MDTypography variant="body2" color="text.secondary">
                    No Image Selected
                  </MDTypography>
                </Box>
              )}

              {!imagePreview ? (
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{
                    mt: 1,
                    backgroundColor: "#1976d2",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  Choose Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                        formik.setFieldValue("image", file);
                      } else {
                        alert("Please select a valid image file.");
                      }
                    }}
                  />
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 0,
                    backgroundColor: "#d32f2f",
                    "&:hover": {
                      backgroundColor: "#c2185b",
                    },
                  }}
                  onClick={() => setImagePreview(null)}
                >
                  Delete Image
                </Button>
              )}
            </MDBox>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Add New Employee
              </MDTypography>
            </MDBox>
            <MDBox pt={3} px={2} pb={2}>
              <form onSubmit={formik.handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Employee Name"
                        name="employeeName"
                        value={formik.values.employeeName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        fullWidth
                        error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
                        helperText={formik.touched.employeeName && formik.errors.employeeName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        fullWidth
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone Number"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        fullWidth
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Department"
                        name="department"
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        error={formik.touched.department && Boolean(formik.errors.department)}
                        helperText={formik.touched.department && formik.errors.department}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Position"
                        name="position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        error={formik.touched.position && Boolean(formik.errors.position)}
                        helperText={formik.touched.position && formik.errors.position}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date of Joining"
                          value={formik.values.date ? dayjs(formik.values.date) : null}
                          onChange={(newValue) => {
                            formik.setFieldValue("date", newValue?.toISOString());
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              error={formik.touched.date && Boolean(formik.errors.date)}
                              helperText={formik.touched.date && formik.errors.date}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        label="Task"
                        name="task"
                        value={formik.values.task}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        error={formik.touched.task && Boolean(formik.errors.task)}
                        helperText={formik.touched.task && formik.errors.task}
                      />
                    </Grid>
                  </Grid>

                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      disabled={formik.isSubmitting}
                      sx={{
                        mt: 2,
                        backgroundColor: "#1976d2",
                        color: "#FFFFFF",
                      }}
                    >
                      {formik.isSubmitting ? "Adding..." : "Add Employee"}
                    </Button>
                  </Box>
                </Box>
              </form>

              {status && (
                <Box mt={3}>
                  {status.success && (
                    <Alert severity="success" onClose={() => setStatus(null)}>
                      {status.success}
                    </Alert>
                  )}
                  {status.error && (
                    <Alert severity="error" onClose={() => setStatus(null)}>
                      {status.error}
                    </Alert>
                  )}
                </Box>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

AddEmployeesFormModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
