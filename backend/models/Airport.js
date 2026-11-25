import mongoose from "mongoose";

const aiportSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },

        code:{
            type: String,
            required: true,
            trim: true,
            uppercase: true,
            unique: true,
            minlength: 3,
            maxlength:3
        },

        city:{
            type: String,
            required: true,
            trim: true
        },

        country:{
            type: String,
            required: true,
            trim: true
        },

        timezone:{
            type: String,
            required: true
        },

        isActive:{
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Airport = mongoose.model("Airport", aiportSchema);

export default Airport;