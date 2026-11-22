import mongoose, { mongo } from "mongoose";

const aircraftSchema = new mongoose.Schema(
    {
        airlineId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airline",
            required: true
        },

        aircraftModel:{
            type: String,
            required: true,
            trim: true
        },

        manufacturer:{
            type: String,
            required: true,
            trim: true
        },

        registrationNumber:{
            type: String,
            required: true,
            uppercase: true,
            trim: true,
            unique: true
        },

        economySeats:{
            type: Number,
            requiored: true,
            min: 0
        },

        businessSeats:{
            type: Number,
            default: 0,
            min: 0
        },

        firstclassSeats:{
            type: Number,
            default: 0,
            min: 0
        },

        totalSeats:{
            type: Number,
            required: true
        },

        status:{
            type: String,
            enum: ["active", "maintenance", "retried"],
            default: "active"
        }
    },
    { timestamps: true }
);

const Aircraft = mongoose.model("Aircraft", aircraftSchema);

export default Aircraft; 