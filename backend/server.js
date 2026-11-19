import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middleware 
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success : true,
        message : "Flight Reservation API is running"
    });
});

// Start server after datbase connection
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });
    } catch (error){
        console.error("Server startup failed", error.message);
        process.exit(1);
    }
};

startServer();