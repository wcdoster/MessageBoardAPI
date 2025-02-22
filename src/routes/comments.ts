import { Router } from "express";
import CommentController from "@controllers/CommentController";

const router: Router = Router();

router.get("/:id", CommentController.getCommentById);
router.post("/", CommentController.createComment);
router.put("/", CommentController.updateCommentById);
router.delete("/:id", CommentController.deleteCommentById);

module.exports = router as Router;
