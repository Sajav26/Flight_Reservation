import Aircraft from "../models/Aircraft.js";

export const createAircraft = async (req, res) => {
    try{
        const{
            aircraftModel,
            manufacturer,
            registrationNumber,
            economySeats,
            businessSeats = 0,
            firstClassSeats = 0
        } = req.body;

        if (
            !aircraftModel ||
            !manufacturer ||
            !registrationNumber ||
            economySeats === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required aircraft details"
            });
        }

        if (
            !Number.isInteger(economySeats) ||
            !Number.isInteger(businessSeats) ||
            !Number.isInteger(firstClassSeats) ||
            economySeats < 0 ||
            businessSeats < 0 ||
            firstClassSeats < 0 ||
            economySeats + businessSeats + firstClassSeats <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invaild seat capacities"
            });
        }

        const totalSeats = economySeats + businessSeats + firstClassSeats;

        const aircraft = await Aircraft.create({
            airlineId: req.user.airlineId,
            aircraftModel,
            manufacturer,
            registrationNumber,
            economySeats,
            businessSeats,
            firstClassSeats,
            totalSeats
        });

        return res.status(201).json({
            success: true,
            message: "Aircraft created successfully",
            aircraft
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Aircraft registration number already exists"
            });
        }

        console.error("Craete aircraft error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create aircraft"
        });
    }
};

export const getMyAircraft = async (req, res) => {
    try{
        const aircraft = await Aircraft.find({
            airlineId: req.user.airlineId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: aircraft.length,
            aircraft
        });
    } catch (error) {
        console.error("Get aircraft error:");

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve aircraft"
        });
    }
};

export const updateMyAircraft = async (req, res) => {
    try{
        const allowedFields = [
            "aircraftModel",
            "manufacturer",
            "economySeats",
            "businessSeats",
            "firstClassSeats",
            "status"
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0){
            return res.status(400).json({
                success: false,
                message: "No vaild fields provided"
            });
        }

        const aircraft = await Aircraft.findOne({
            _id: req.params.id,
            airlineId: req.user.airlineId
        });

        if (!aircraft) {
            return res.status(404).json({
                success: false,
                message: "Aircraft not found"
            });
        }

        const economySeats = updates.economySeats ?? aircraft.economySeats;
        const businessSeats = updates.businessSeats ?? aircraft.businessSeats;
        const firstClassSeats = updates.firstClassSeats ?? aircraft.firstclassSeats;

        if (
            !Number.isInteger(economySeats) ||
            !Number.isInteger(businessSeats) ||
            !Number.isInteger(firstClassSeats) ||
            economySeats < 0 ||
            businessSeats < 0 ||
            firstClassSeats < 0 ||
            economySeats + businessSeats + firstClassSeats <= 0 
        ) {
            return res.status(400).json({
                success: false,
                message: "Inavild sent capacities"
            });
        }

        updates.totalSeats = economySeats + businessSeats + firstClassSeats;

        Object.assign(aircraft, updates);
        await aircraft.save();

        return res.status(200).json({
            success: true,
            message: "Aircraft updated sucessfully",
            aircraft
        });
    } catch (error) {
        console.error("Update aircraft error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update aircraft"
        });
    }
};