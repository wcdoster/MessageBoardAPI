import { Request, Response } from "express";
import { prisma } from "../index";

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email } = req.body;
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
      },
    });
    res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createUser,
  getUserById,
};
