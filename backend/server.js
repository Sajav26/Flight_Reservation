import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware 
app.use(cors());
app.use(express.json());

// Test api
app.get("/", (req, res) =>{
    res.status(200).json({
        success: true,
        message:"Flight Reservation API is Running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Sever running on the port ${PORT}`);
});