require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const candidateRoutes = require("./routes/candidateRoute");
const cors = require("cors");

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1/candidates", candidateRoutes);

app.get("/", (req, res) => {
  return res.send(
    "Admin Panel Home - Monitor, Manage, and Maintain your data securely!"
  );
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
