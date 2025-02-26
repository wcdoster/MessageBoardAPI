import { Request, Response } from "express";
import { prisma } from "../index";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: user?.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userId: user?.id });
  } catch (e) {
    res.status(500).json("Registration Failed");
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    const token = jwt.sign({ userId: user?.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
};

export default { register, login };
