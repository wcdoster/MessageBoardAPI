import { Request, Response } from "express";
import { prisma } from "../index";

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  try {
    const boards = await prisma.board.findMany({
      include: { createdBy: { select: { id: true, username: true } } },
    });
    res.status(200).json(boards);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getBoardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const board = await prisma.board.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, username: true } } },
    });
    res.status(200).json(board);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getPostsByBoardId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const board = await prisma.post.findMany({
      where: { boardId: id },
      include: { createdBy: { select: { id: true, username: true } } },
    });
    res.status(200).json(board);
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
};
