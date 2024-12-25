import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MDBox from "components/MDBox";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isBetween from "dayjs/plugin/isBetween";
import weekOfYear from "dayjs/plugin/weekOfYear";

// Extend dayjs with the plugins
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

export default function AddEmployeesFormModal({ closeModal }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      date: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      department: Yup.string().required("Department is required"),
      position: Yup.string().required("Position is required"),
      date: Yup.date().required("Date is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      const form = new FormData();
      for (const key in values) {
        form.append(key, values[key]);
      }
      setSubmitting(true);

      try {
        const response = await fetch("", {
          method: "POST",
          body: form,
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        setStatus({ success: "Employee added successfully!" });
        setTimeout(() => {
          closeModal();
        }, 1000);
      } catch (error) {
        setStatus({ error: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <MDBox pt={6} pb={3}>
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
                Add New Employee
              </MDTypography>
            </MDBox>
            <MDBox pt={3} px={2} pb={2}>
              <form onSubmit={formik.handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
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
                            formik.setFieldValue(
                              "date",
                              newValue ? dayjs(newValue).format("YYYY-MM-DD") : ""
                            );
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

AddEmployeesFormModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
