    import jwt from "jsonwebtoken";

    export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const verify = jwt.verify(token, process.env.SECRET);
        req.user = verify;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
    };
