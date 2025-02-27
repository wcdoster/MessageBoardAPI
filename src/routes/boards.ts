import BoardController from "@controllers/BoardController";
import { Router } from "express";
import { verifyTokenMiddleware } from "src/middleware/authMiddleware";

const router: Router = Router();

router.get("/", BoardController.getAllBoards);
router.get("/:id", BoardController.getBoardById);
router.get("/:id/posts", BoardController.getPostsByBoardId);

router.post("/", verifyTokenMiddleware, BoardController.createBoard);

module.exports = router as Router;
