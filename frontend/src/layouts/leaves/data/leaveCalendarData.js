// /* eslint-disable react/prop-types */
// import Icon from "@mui/material/Icon";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// // Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

// export default function leaveCalendarData() {
//   const Leave = ({ image, name }) => (
//     <MDBox display="flex" alignItems="center" lineHeight={1}>
//       <MDAvatar src={image} name={name} size="sm" variant="rounded" />
//       <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
//         {name}
//       </MDTypography>
//     </MDBox>
//   );

//   const Progress = ({ color, value }) => (
//     <MDBox display="flex" alignItems="center">
//       <MDTypography variant="caption" color="text" fontWeight="medium">
//         {value}%
//       </MDTypography>
//       <MDBox ml={0.5} width="9rem">
//         <MDProgress variant="gradient" color={color} value={value} />
//       </MDBox>
//     </MDBox>
//   );

//   return {
//     columns: [
//       { Header: "Name", accessor: "project", width: "30%", align: "left" },
//       { Header: "budget", accessor: "budget", align: "left" },
//       { Header: "status", accessor: "status", align: "center" },
//       { Header: "completion", accessor: "completion", align: "center" },
//       { Header: "action", accessor: "action", align: "center" },
//     ],

//     rows: [
//       {
//         project: <Leave image={LogoAsana} name="Asana" />,
//         budget: (
//           <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//             $2,500
//           </MDTypography>
//         ),
//         status: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             working
//           </MDTypography>
//         ),
//         completion: <Progress color="info" value={60} />,
//         action: (
//           <MDTypography component="a" href="#" color="text">
//             <Icon>more_vert</Icon>
//           </MDTypography>
//         ),
//       },
//       {
//         project: <Leave image={logoGithub} name="Github" />,
//         budget: (
//           <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//             $5,000
//           </MDTypography>
//         ),
//         status: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             done
//           </MDTypography>
//         ),
//         completion: <Progress color="success" value={100} />,
//         action: (
//           <MDTypography component="a" href="#" color="text">
//             <Icon>more_vert</Icon>
//           </MDTypography>
//         ),
//       },
//       {
//         project: <Leave image={logoAtlassian} name="Atlassian" />,
//         budget: (
//           <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//             $3,400
//           </MDTypography>
//         ),
//         status: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             canceled
//           </MDTypography>
//         ),
//         completion: <Progress color="error" value={30} />,
//         action: (
//           <MDTypography component="a" href="#" color="text">
//             <Icon>more_vert</Icon>
//           </MDTypography>
//         ),
//       },
//       {
//         project: <Leave image={logoSpotify} name="Spotify" />,
//         budget: (
//           <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//             $14,000
//           </MDTypography>
//         ),
//         status: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             working
//           </MDTypography>
//         ),
//         completion: <Progress color="info" value={80} />,
//         action: (
//           <MDTypography component="a" href="#" color="text">
//             <Icon>more_vert</Icon>
//           </MDTypography>
//         ),
//       },
//       {
//         project: <Leave image={logoSlack} name="Slack" />,
//         budget: (
//           <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//             $1,000
//           </MDTypography>
//         ),
//         status: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             canceled
//           </MDTypography>
//         ),
//         completion: <Progress color="error" value={0} />,
//         action: (
//           <MDTypography component="a" href="#" color="text">
//             <Icon>more_vert</Icon>
//           </MDTypography>
//         ),
//       },
//       {
//         project: <Leave image={logoInvesion} name="Invesion" />,
//         budget: (
//           <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
//             $2,300
//           </MDTypography>
//         ),
//         status: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             done
//           </MDTypography>
//         ),
//         completion: <Progress color="success" value={100} />,
//         action: (
//           <MDTypography component="a" href="#" color="text">
//             <Icon>more_vert</Icon>
//           </MDTypography>
//         ),
//       },
//     ],
//   };
// }

/* eslint-disable react/prop-types */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function leavesCalendarData() {
  const Applied = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography>{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      //   { Header: "Profile", accessor: "srNo", width: "45%", align: "left" },
      { Header: "Today", accessor: "author", width: "45%", align: "left" },
      { Header: "Date", accessor: "employed", align: "center" },
      //   { Header: "Email Address", accessor: "email", width: "45%", align: "center" },
      //   { Header: "Phone Number", accessor: "phone", width: "45%", align: "center" },
      //   { Header: "Reason", accessor: "function", align: "left" },
      //   { Header: "Status", accessor: "status", align: "center" },
      // { Header: "Resume", accessor: "resume", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: <Applied image={team2} name="John Michael" email="john@creative-tim.com" />,
        function: <Job title="Manager" description="Organization" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Applied image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Applied image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
        function: <Job title="Executive" description="Projects" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Applied image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/12/08
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Applied image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        function: <Job title="Manager" description="Executive" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        author: <Applied image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            14/09/20
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
    ],
  };
}
