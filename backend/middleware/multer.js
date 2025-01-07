// const multer = require("multer");
// const path = require("path");

// // Configure Multer Storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/profile");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
//   },
// });

// // File Filter for Validation
// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed!"),
//       false
//     );
//   }
// };

// // Multer Middleware
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter,
// });

// module.exports = upload;

const multer = require("multer");
const path = require("path");

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath =
      file.fieldname === "profile" ? "uploads/profile" : "uploads/documents";
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File Filter for Validation
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, JPG, and PDF are allowed!"),
      false
    );
  }
};

// Multer Middleware for multiple fields
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

module.exports = upload;
