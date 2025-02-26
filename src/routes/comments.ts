import { Router } from "express";
import CommentController from "@controllers/CommentController";
import { verify } from "crypto";
import { verifyToken } from "src/middleware/authMiddleware";

const router: Router = Router();

router.get("/:id", CommentController.getCommentById);
router.post("/", verifyToken, CommentController.createComment);
router.put("/", verifyToken, CommentController.updateCommentById);
router.delete("/:id", verifyToken, CommentController.deleteCommentById);

module.exports = router as Router;
