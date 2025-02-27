import { request, response } from "express";
import User from "../models/user.model.js";
import { createUserSchema } from "../validators/user.validator.js";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    const { error } = createUserSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const userObject = user.get({ plain: true });
    userObject.token = user.generateAuthToken();
    return res.status(201).json({ data: userObject });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function getAuthenticatedUser(req, res) {
  try {
    const token = req.cookies?.accessToken || req.headers["x-authorization"];
    if (!token) return res.status(401).json({ error: "Access Denied" });
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ error: "Nahi Bhetla User" });
    res.json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
}
