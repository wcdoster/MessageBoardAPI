import { Request, Response } from "express";
import { prisma } from "../index";

const addMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, boardId } = req.body;
    const currentUser = await prisma.boardsUsers.findFirst({
      where: { memberId: userId, boardId },
    });
    if (currentUser) {
      res.status(409).send("User is already a member of this board");
      return;
    }
    await prisma.boardsUsers.create({
      data: {
        boardId,
        memberId: userId,
      },
    });
    res.status(200).json("Member created successfully");
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const removeMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, boardId } = req.body;
    await prisma.boardsUsers.deleteMany({
      where: { memberId: userId, boardId },
    });
    res.status(200).json("Member removed successfully");
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  addMember,
  removeMember,
};
