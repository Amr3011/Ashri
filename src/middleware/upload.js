const multer = require("multer");
const path = require("path");

// In production (Vercel), disable file uploads
if (process.env.NODE_ENV === "production") {
  // Create a mock upload middleware that prevents file uploads
  const noUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 0 },
  });

  module.exports = {
    array: () => (req, res, next) => {
      // Skip file upload in production
      req.files = [];
      next();
    },
  };
} else {
  // Development: Normal file upload
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "product-" + uniqueSuffix + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB max file size
    },
    fileFilter: fileFilter,
  });

  module.exports = upload;
}
