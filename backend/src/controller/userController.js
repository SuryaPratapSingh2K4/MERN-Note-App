    import User from "../model/userModel.js";
    import bcrypt from "bcrypt";
    import jwt from "jsonwebtoken";
    import validator from "validator";

    export const createToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "3d" });
    };

    export async function Login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
        res.status(400).json({ message: "All fields need to be field" });
        }
        const existingUser = await User.findOne({ email });

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
        return res.status(400).json({ message: "Invalid Email or password" });
        }
        const token = createToken(existingUser);
        return res
        .status(201)
        .json({ message: "Successfully Logged In", user: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
    }

    export async function SignUp(req, res) {
    try {
        const { fullname, email, password } = req.body;
        if (!email || !password || !fullname)
        return res.status(400).json({ message: "Please enter all the fields" });
        if (!validator.isEmail(email))
        return res.status(400).json({ message: "Enter the valid email" });
        if (!validator.isStrongPassword(password)) {
        return res
            .status(400)
            .json({ message: "Enter the strong security password" });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
        return res.status(400).json({ message: "Account already existed" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
        email,
        password: hashedPassword,
        fullname,
        });
        const token = createToken(newUser);
        return res.status(201).json({
        message: "Account registered successfully",
        user: { newUser },
        token,
        });
    } catch (error) {
        res.status(500).json({ message: "SignUp Failed", error });
    }
    }
