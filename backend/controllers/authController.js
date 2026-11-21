import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) =>{
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "id"}
    );
};

// register passenger
export const registerPassenger = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;

        if (!firstName || !lastName || !email || !password){
            return res.status(400).json({
                success : false,
                message : "Please provide all required fields"
            });
        }

        if (password.length < 8){
            return res.status(400).json({
                success : false,
                message : "Password must contain at least 8 characters"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email : normalizedEmail
        });

        if (existingUser){
            return res.status(409).json({
                success : false,
                message : "An account with this email already exists"
            });
        }

        const hasedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email: normalizedEmail,
            password: hasedPassword,
            phone,
            role: "passenger"
        });

        return res.status(201).json({
            success : true,
            message : "Passenger account created successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.LastName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error){
        if (error.code === 11000){
            return res.status(409).json({
                success : false,
                message : "This email is already registerted"
            });
        }

        return res.status(500).json({
            success : false,
            message : "Registeration failed",
            error : error.message
        })
    }
};

// passenger login
export const loginPassenger = async (req, res) => {
    try {
        const { email, password } =req.body;

        if (!email || !password) {
            return res.status(400).json({
                success : false,
                message : "Email and Password are required"
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        }).select("+password");

        if (!user || user.role !== "passenger"){
            return res.status(401).json({
                success : false,
                message : "Invaild email or password"
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success : false,
                message : "This account is inactive"
            });
        }

        const isPassowrdCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPassowrdCorrect) {
            return res.status(401).json({
                success : false,
                message : "Invaild email or password"
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success : true,
            message : "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return  res.status(500).json({
            succes : false,
            message : "Login failed",
            error : error.message
        });
    }
};