const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Connect to the database
connectDB().catch((err) => {
  console.error("Failed to connect to DB", err);
  process.exit(1);
});

// CORS configuration
const corsOptions = {
  origin: 'https://foodie-zwzi.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
};

// CORS middleware
app.use(cors(corsOptions));

// Middleware to cache preflight requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Max-Age', '86400'); 
  next();
});

// Initialize other middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/uploads", express.static("uploads"));

// Import routes
const users = require("./routes/users");
const recipes = require("./routes/recipes");
const ratings = require("./routes/ratings");

// Use routes
app.use("/backend/users", users);
app.use("/backend/recipes", recipes);
app.use("/backend/ratings", ratings);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
