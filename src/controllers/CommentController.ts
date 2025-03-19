import { Request, Response } from "express";
import { prisma } from "../index";

const getCommentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, username: true } } },
    });
    res.status(200).json(comment);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, createdByUserId, parentCommentId, postId } = req.body;
    const newComment = await prisma.comment.create({
      data: {
        text,
        parentCommentId,
        postId,
        createdByUserId,
      },
    });
    console.log({ newComment });
    res.status(200).json(newComment);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

const updateCommentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { text, id } = req.body;
    const newComment = await prisma.comment.update({
      data: {
        text,
        updatedAt: new Date(),
      },
      where: { id },
    });
    res.status(200).json(newComment);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteCommentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    prisma.comment.delete({ where: { id } });
    res.status(200).json("Deleted");
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
