import BoardController from "@controllers/BoardController";
import { Router } from "express";
import { verifyTokenMiddleware } from "src/middleware/authMiddleware";

const router: Router = Router();

router.get("/", BoardController.getAllBoards);
router.get("/:id", BoardController.getBoardById);
router.get("/:id/posts", BoardController.getPostsByBoardId);
router.get(
  "/members/:id",
  verifyTokenMiddleware,
  BoardController.getBoardsByMemberId
);
router.get(
  "/createdBy/:id",
  verifyTokenMiddleware,
  BoardController.getBoardsByCreateByUserId
);

router.post("/", verifyTokenMiddleware, BoardController.createBoard);

module.exports = router as Router;
