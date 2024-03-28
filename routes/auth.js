import { Router } from "express";
import { User } from "../model/user.js"; // Import the User model
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });

        }
        const userData = {
            // _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role 
            
        };

        

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully", user:userData });
        // res.status(200).send({ data: {  user: userData,token , message: "Logged in successfully" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal Server error" });
    }
});




export default router;


