import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Employees from "layouts/employees";
import Attendance from "layouts/attendance";
import Applied from "layouts/leaves";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Logout from "layouts/authentication/log-out";
// import Candidates from "layouts/candidates";

// @mui icons
import Icon from "@mui/material/Icon";
import Candidates from "layouts/tables";
// import Candidates from "layouts/candidates";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Candidates",
    key: "candidates",
    icon: <PersonAddIcon fontSize="small">candidates_view</PersonAddIcon>,
    route: "/candidates",
    component: <Candidates />,
  },
  {
    type: "collapse",
    name: "Employees",
    key: "employees",
    icon: <SupervisorAccountIcon fontSize="small">employees_view</SupervisorAccountIcon>,
    route: "/employees",
    component: <Employees />,
  },
  {
    type: "collapse",
    name: "Attendance",
    key: "attendance",
    icon: <SignalCellularAltIcon fontSize="small">attendance_view</SignalCellularAltIcon>,
    route: "/attendance",
    component: <Attendance />,
  },
  {
    type: "collapse",
    name: "Leaves",
    key: "leaves",
    icon: <AutoAwesomeIcon fontSize="small">applied_view</AutoAwesomeIcon>,
    route: "/leaves",
    component: <Applied />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "collapse",
    name: "Log out",
    key: "log-out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/log-out",
    component: <Logout />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
