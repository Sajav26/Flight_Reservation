import mongoose, { mongo } from "mongoose";

const flightSchema = new mongoose.Schema(
    {
        airlineId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airline",
            required: true
        },

        aircraftId:{
            type: mongo.Schema.Types.ObjectId,
            ref: "Aircraft",
            required: true
        },

        flightNumber:{
            type: String,
            required: true,
            uppercase: true,
            trim: true
        },

        departureAirport:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airport",
            required: true
        },

        arrivalAirport:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airport",
            required: true
        },

        departureTime:{
            type: Date,
            required: true
        },

        arrivalTime:{
            type: Date,
            required: true
        },

        economyPrice:{
            type: Number,
            required: true,
            min: 0
        },

        businessPrice:{
            type: Number,
            required: true,
            min: 0
        },

        firstClassPrice:{
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "scheduled",
                "boarding",
                "departed",
                "arrived",
                "delayed",
                "cancelled"
            ],
            default: "scheduled"
        }
    },
    { timestamps: true }
);

flightSchema.index(
    { airlineId: 1, flightNumber: 1, departureTime: 1},
    { unique: true}
);

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;