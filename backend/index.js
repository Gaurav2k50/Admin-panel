require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/routes");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1", apiRoutes);

app.get("/", (req, res) => {
  return res.send(
    "Admin Panel Home - Monitor, Manage, and Maintain your data securely!"
  );
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
