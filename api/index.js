// Vercel serverless function entry point
// Import and initialize the app
const app = require("../src/server");

// Export as a serverless function handler
module.exports = async (req, res) => {
  return app(req, res);
};
