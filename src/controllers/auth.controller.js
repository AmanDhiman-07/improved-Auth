import UserModel from "../models/user.models";
import bcrypt from "bcrypt"

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const isAlreadyRegisterd = await UserModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (isAlreadyRegisterd) {
            res.status(409).json({
                message: "Username or email already existed.."
            })
        }

        const hashedPassword = bcrypt.hash(password, 10)

        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword
        })
    } catch (error) {

    }
}