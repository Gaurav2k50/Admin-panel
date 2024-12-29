// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { toast } from "react-toastify";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import textField from "assets/theme/components/form/textField";
import BasicLayout from "../components/BasicLayout";
import { useState } from "react";

function Cover() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State to store form data
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Using useNavigate hook to navigate after successful signup
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Call the fetch API to submit the form data
    try {
      const response = await fetch("http://localhost:5001/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong!");
      } else {
        toast.success("Signup successful!");
        navigate("/authentication/sign-in");
      }
    } catch (error) {
      // Handle network or other errors
      setError("Failed to submit the form. Please try again later.");
      toast.error("Failed to submit the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Call the fetch API to submit the form data

  return (
    <BasicLayout image={bgImage}>
      <Card sx={{ mt: "120px" }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Welcome to Dashboard
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                name="email"
                fullWidth
                value={formData.email}
                onChange={handleInputChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            {error && (
              <MDTypography color="error" variant="body2" mt={2}>
                {error}
              </MDTypography>
            )}
            <MDBox mt={1} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account? &apos;
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
