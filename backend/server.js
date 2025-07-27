const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;
const MONGODB_URI = process.env.MONGODB_URI;

const allowedOrigins = ["http://localhost:4200"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Routes
const authRoutes = require("./routes/auth");
const chatbotRoutes = require("./routes/api"); // <-- Import the new chatbot route

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes); // <-- Tell Express to use the chatbot route

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "angular-client/dist/angular-client"))
  );
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "angular-client/dist/angular-client/index.html")
    );
  });
}

app.get("/", (req, res) => {
  res.send("Welcome to the Stock Learning Institute Backend!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
