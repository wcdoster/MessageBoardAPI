import { Request, Response } from "express";
import { prisma } from "../index";
import { jwtDecode } from "jwt-decode";

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

export default {
  getUserById,
};
