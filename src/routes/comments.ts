import { Router } from "express";
import CommentController from "@controllers/CommentController";
import { verifyTokenMiddleware } from "src/middleware/authMiddleware";

const router: Router = Router();

router.get("/:id", CommentController.getCommentById);
router.post("/", verifyTokenMiddleware, CommentController.createComment);
router.put("/", verifyTokenMiddleware, CommentController.updateCommentById);
router.delete(
  "/:id",
  verifyTokenMiddleware,
  CommentController.deleteCommentById
);

module.exports = router as Router;
