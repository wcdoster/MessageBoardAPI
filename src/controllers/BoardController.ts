import { Request, Response } from "express";
import { prisma } from "../index";

interface GetAllBoardsResponse {
  id: string;
  title: "string";
  description: string;
  createdByUserId: string;
  createdAt: Date;
  memberCount: string | number;
  userIsMember: "TRUE" | "FALSE" | boolean;
}

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  try {
    const boards = await prisma.board.findMany({
      include: { _count: { select: { members: true, posts: true } } },
    });
    res.status(200).send(JSON.stringify(boards));
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getBoardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: { select: { members: true, posts: true } },
      },
    });
    res.status(200).json(board);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getBoardsByCreateByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const boards = await prisma.board.findMany({
      include: { _count: { select: { members: true, posts: true } } },
      where: { createdByUserId: id },
    });
    res.status(200).json(boards);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getBoardsByMemberId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const boards = await prisma.board.findMany({
      include: { _count: { select: { members: true, posts: true } } },
      where: { members: { some: { memberId: id } } },
    });
    res.status(200).json(boards);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getPostsByBoardId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id;
    const posts = await prisma.post.findMany({
      where: {
        boardId: id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: { select: { comments: true } },
      },
    });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const createBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, createdByUserId, description } = req.body;
    const newBoard = await prisma.board.create({
      data: {
        title,
        createdByUserId,
        description,
      },
    });
    await prisma.boardsUsers.create({
      data: {
        boardId: newBoard.id,
        memberId: createdByUserId,
      },
    });
    res.status(200).json(newBoard);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createBoard,
  getBoardById,
  getAllBoards,
  getPostsByBoardId,
  getBoardsByMemberId,
  getBoardsByCreateByUserId,
};
