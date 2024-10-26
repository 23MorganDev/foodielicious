const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// Connect to the database
connectDB().catch((err) => {
  console.error("Failed to connect to DB", err);
  process.exit(1);
});

// Exact URLs for CORS configuration
const corsOptions = {
  origin: [
    'https://foodie-zwzi.onrender.com',  
    'http://localhost:5173'  
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

// Initialize other middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
const users = require("./routes/users");
const recipes = require("./routes/recipes");
const ratings = require("./routes/ratings");

app.use("/backend/users", users);
app.use("/backend/recipes", recipes);
app.use("/backend/ratings", ratings);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
