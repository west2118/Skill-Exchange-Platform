import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "fallback_secret");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
