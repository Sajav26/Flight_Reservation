import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            trim: true
        },

        lastName:{
            type: String,
            required: true,
            trim: true
        },

        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password:{
            type: String,
            required: true,
            minlength: 8,
            select: false
        },

        phone:{
            type: String,
            trim: true,
            default: ""
        },

        role: {
            type: String,
            enum: [
                "passenger",
                "super_admin",
                "airline_manager",
                "booking_officer",
                "checking_staff",
                "flight_operation"
            ],
            default: "passenger"
        },

        airlineId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airline",
            default: null
        },

        isActive:{
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;