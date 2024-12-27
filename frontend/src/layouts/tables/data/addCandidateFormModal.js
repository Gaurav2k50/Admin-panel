import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  Grid,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function AddCandidateFormModal({ closeModal }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      department: "",
      experience: "",
      resume: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      department: Yup.string().required("Department is required"),
      experience: Yup.string().required("Experience is required"),
      resume: Yup.mixed().required("Resume is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      const form = new FormData();
      for (const key in values) {
        form.append(key, values[key]);
      }
      setSubmitting(true);

      try {
        const response = await fetch("http://localhost:5001/api/v1/candidates", {
          method: "POST",
          body: form,
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        setStatus({ success: "Candidate added successfully!" });
        setTimeout(() => {
          closeModal();
        }, 1000);
      } catch (err) {
        setStatus({ error: err.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <MDBox pt={6} pb={3}>
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
        <Grid item xs={12}>
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
                Add New Candidate
              </MDTypography>
            </MDBox>
            <MDBox pt={3} px={2} pb={2}>
              <form onSubmit={formik.handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                  {/* Row of two input fields */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        fullWidth
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
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

                  {/* Row of two input fields */}
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

                  {/* Single input field */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Experience"
                        name="experience"
                        value={formik.values.experience}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        error={formik.touched.experience && Boolean(formik.errors.experience)}
                        helperText={formik.touched.experience && formik.errors.experience}
                      />
                    </Grid>

                    {/* Resume input field */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="file"
                        inputProps={{ accept: ".pdf, .doc, .docx" }}
                        onChange={(e) => formik.setFieldValue("resume", e.target.files[0])}
                        fullWidth
                        error={formik.touched.resume && Boolean(formik.errors.resume)}
                        helperText={formik.touched.resume && formik.errors.resume}
                      />
                    </Grid>
                  </Grid>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={formik.isSubmitting}
                    sx={{
                      color: "#FFFFFF",
                    }}
                  >
                    {formik.isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit"
                    )}
                  </Button>

                  {/* Alerts */}
                  {formik.status?.error && <Alert severity="error">{formik.status.error}</Alert>}
                  {formik.status?.success && (
                    <Alert severity="success">{formik.status.success}</Alert>
                  )}
                </Box>
              </form>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

AddCandidateFormModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
