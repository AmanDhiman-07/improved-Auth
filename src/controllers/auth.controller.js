import UserModel from "../models/user.models.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config/config.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const isAlreadyRegisterd = await UserModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (isAlreadyRegisterd) {
            return res.status(409).json({
                message: "Username or email already existed.."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: user._id,
        }, config.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.status(201).json({
            message: "User register successfully..",
            user: {
                username: username,
                email: email
            },
            token // this is a token genewrated in 
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const getMe = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            meassge: "token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)

    // console.table(decoded)

    const user = await UserModel.findById(decoded.id)

    res.status(200).json({
        meassge: "User fetched successfully",
        user: {
            username: user.username,
            email: user.email
        }
    })
}