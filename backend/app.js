const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

connectDB();

// Initialize middleware
//increase the size limit of formdata
app.use(express.json({ limit: '10mb' })); //for json requests
app.use(express.urlencoded({ limit: '10mb', extended: true }));  //for urlencoded request
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Define routes
const users = require("./routes/users");
const recipes = require("./routes/recipes");
const ratings = require("./routes/ratings");

app.use("/backend/users", users);
app.use("/backend/recipes", recipes);
app.use("/backend/ratings", ratings);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
