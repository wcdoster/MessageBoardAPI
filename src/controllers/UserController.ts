import { Request, Response } from "express";
import { prisma } from "../index";

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        upvotes: { select: { id: true, comment: { select: { id: true } } } },
        downvotes: { select: { id: true, comment: { select: { id: true } } } },
        boards: { select: { id: true } },
        email: true,
        id: true,
        username: true,
        joinedBoards: { select: { boardId: true } },
        comments: { select: { id: true } },
        posts: { select: { id: true } },
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  getUserById,
};
