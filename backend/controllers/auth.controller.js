import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY || "fallback_secret", { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY || "fallback_secret", { expiresIn: "7d" });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await RefreshToken.create({
      token: refreshToken,
      user: newUser._id,
      expiresAt
    });

    res.cookie("token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict", maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict", maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(201).json({ 
      message: "User registered", 
      user: { 
        _id: newUser._id, 
        email: newUser.email, 
        firstName: newUser.firstName, 
        lastName: newUser.lastName,
        location: newUser.location,
        offeredSkills: newUser.offeredSkills,
        seekedSkills: newUser.seekedSkills,
        isAdmin: newUser.isAdmin
      } 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.password) {
      return res.status(400).json({ message: "Account requires password reset or was created with external provider" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY || "fallback_secret", { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY || "fallback_secret", { expiresIn: "7d" });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await RefreshToken.create({
      token: refreshToken,
      user: user._id,
      expiresAt
    });

    res.cookie("token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict", maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict", maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ 
      message: "Logged in successfully", 
      user: { 
        _id: user._id, 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName,
        location: user.location,
        offeredSkills: user.offeredSkills,
        seekedSkills: user.seekedSkills,
        isAdmin: user.isAdmin
      } 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await RefreshToken.findOneAndDelete({ token: refreshToken });
  }

  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};

const refreshSession = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "Not Authenticated" });

  try {
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    if (storedToken.expiresAt < new Date()) {
      await RefreshToken.findOneAndDelete({ token: refreshToken });
      return res.status(401).json({ message: "Refresh token expired" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY || "fallback_secret");
    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY || "fallback_secret", { expiresIn: "15m" });
    
    res.cookie("token", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict", maxAge: 15 * 60 * 1000 });
    res.status(200).json({ message: "Session refreshed" });
  } catch (error) {
    // If JWT verification fails
    if (refreshToken) {
        await RefreshToken.findOneAndDelete({ token: refreshToken });
    }
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

const getProfile = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "fallback_secret");
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error: error.message });
  }
};

export { register, login, logout, refreshSession, getProfile };
