import mongoose from "mongoose";

const airlineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        code:{
            type: String,
            required: true,
            uppercase: true,
            trim: true,
            unique: true
        },

        country:{
            type: String,
            required: true,
            trim: true
        },

        description:{
            type: String,
            default: ""
        },

        logo:{
            type: String,
            default: ""
        },

        email:{
            type: String,
            trim: true,
            lowercase: true
        },

        phone:{
            type: String,
            default: ""
        },

        managerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        isActive:{
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Airline = mongoose.model("Airline", airlineSchema);

export default Airline;