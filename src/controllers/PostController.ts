import { Request, Response } from "express";
import { prisma } from "../index";

const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const board = await prisma.post.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, username: true } } },
    });
    res.status(200).json(board);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, createdByUserId, description, boardId } = req.body;
    console.log(req.body);
    const newPost = await prisma.post.create({
      data: {
        description,
        title,
        boardId,
        createdByUserId,
      },
    });
    console.log({ newPost });
    res.status(200).json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createPost,
  getPostById,
};
