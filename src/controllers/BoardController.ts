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
    const boardData: GetAllBoardsResponse[] =
      await prisma.$queryRaw`SELECT board.*, COUNT(user.id) as memberCount FROM board LEFT JOIN boardsUsers ON board.id = boardsUsers.boardId FULL OUTER JOIN user ON boardsUsers.memberID = user.id WHERE board.id IS NOT NULL GROUP BY board.id
     `;
    const boards = boardData.map((x) => ({
      ...x,
      memberCount: parseInt(x.memberCount.toString()),
    }));

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
      },
    });
    const memberTotal = await prisma.board.findUnique({
      where: { id },
    });
    res.status(200).json({
      ...board,
      memberTotal: memberTotal,
    });
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
    const boardData: GetAllBoardsResponse[] =
      await prisma.$queryRaw`SELECT board.*, COUNT(user.id) as memberCount FROM board LEFT JOIN boardsUsers ON board.id = boardsUsers.boardId FULL OUTER JOIN user ON boardsUsers.memberID = user.id WHERE board.createdByUserId = ${id} GROUP BY board.id
    `;
    const boards = boardData.map((x) => ({
      ...x,
      memberCount: parseInt(x.memberCount.toString()),
    }));
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
    const boardData: GetAllBoardsResponse[] =
      await prisma.$queryRaw`SELECT board.*, COUNT(user.id) as memberCount FROM board LEFT JOIN boardsUsers ON board.id = boardsUsers.boardId FULL OUTER JOIN user ON boardsUsers.memberID = user.id WHERE user.id = ${id} GROUP BY board.id
    `;
    const boards = boardData.map((x) => ({
      ...x,
      memberCount: parseInt(x.memberCount.toString()),
    }));
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
