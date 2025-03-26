import { Request, Response } from "express";
import { prisma } from "../index";

const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, username: true } },
        board: {
          include: {
            _count: { select: { members: true, posts: true } },
            createdBy: { select: { id: true, username: true } },
          },
        },
        comments: {
          select: {
            _count: { select: { upvotes: true, downvotes: true } },
            createdAt: true,
            createdBy: { select: { username: true } },
            id: true,
            text: true,
            updatedAt: true,
            parentCommentId: true,
          },
        },
        _count: { select: { comments: true } },
      },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, createdByUserId, description, boardId } = req.body;
    const newPost = await prisma.post.create({
      data: {
        description,
        title,
        boardId,
        createdByUserId,
      },
    });
    res.status(200).json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createPost,
  getPostById,
};
