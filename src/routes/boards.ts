import BoardController from "@controllers/BoardController";
import { Router } from "express";

const router: Router = Router();

router.get("/", BoardController.getAllBoards);
router.get("/:id", BoardController.getBoardById);
router.get("/:id/posts", BoardController.getPostsByBoardId)

router.post("/", BoardController.createBoard);

module.exports = router as Router;
