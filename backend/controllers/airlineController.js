import Airline from "../models/Airline.js";
import User from "../models/User.js";

// Super Admin: create an airline and assign its manager
export const createAirline = async (req, res) => {
    try{
        const{
            name,
            code,
            country,
            description,
            email,
            phone,
            managerId
        } = req.body;

        if (!name ||!code ||!country ||!managerId){
            return res.status(400).json({
                success: false,
                message: "Name, code, country and manager are required"
            });
        }

        const manager = await User.findById(managerId);

        if (!manager || manager.role !== "airline_manager"){
            return res.status(409).json({
                success: false,
                message: "This manager is already assigned to an airline"
            });
        }

        const existingAirline = await Airline.findOne({
            code: code.trim().toUpperCase()
        });

        if (existingAirline){
            return res.status(409).json({
                success: false,
                message: "Airline code already exists"
            });
        }

        const airline = await Airline.create({
            name,
            code,
            country,
            description,
            email,
            phone,
            managerId
        });

        manager.airlineId = airline._id;
        await manager.save();

        return res.status(201).json({
            success: true,
            message: "Airline create and manager assigned",
            airline
        });
    } catch (error){
        console.error("Create airline error", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create airline"
        });
    }
};

// Airline Manager: view assigned airline
export const getMyAirline = async (req, res) => {
    try{
        if (!req.user.airlineId) {
            return res.status(404).json({
                success: false,
                message: "No airline assigned to this mamager"
            });
        }

        const airline = await Airline.findOne({
            _id: req.user.airlineId,
            managerId: req.user._id
        });

        if (!airline){
            return res.status(404).json({
                success: false,
                message: "Airline not found"
            });
        }

        return res.status(200).json({
            success: true,
            airline
        });
    } catch (error){
        console.error("Get airline error", error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve airline"
        });
    }
};

// Airline manager: update assigned airline
export const updateMyAirline = async (req, res) => {
    try{
        const allowedFields = [
            "name",
            "description",
            "email",
            "phohe",
            "logo"
        ];

        const updates = {};

        for (const field of allowedFields){
            if (req.body[field] !== undefined){
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                succes: false,
                message: "No vaild fields provided"
            });
        }

        const airline = await Airline.findOneAndUpdate(
            {
                _id: req.user.airlineId,
                managerId: req.user._id
            },
            { $set: updates },
            { new: true, runValidators: true}
        );

        if (!airline) {
            return res.status(404).json({
                success: false,
                message: "Assigned airline not found"
            });
        }

        return res.status(200).json({
            succes: true,
            message: "Airline updated sucessfully"
        });
    } catch (error) {
        console.error("Upadte airline error", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update airline"
        });
    }
;}