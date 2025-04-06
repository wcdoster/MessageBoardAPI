import CommentController from "@controllers/CommentController";
import { Router } from "express";
import { verifyTokenMiddleware } from "src/middleware/authMiddleware";

const router: Router = Router();

router.get("/:id", CommentController.getCommentById);
router.post("/", verifyTokenMiddleware, CommentController.createComment);
router.put("/", verifyTokenMiddleware, CommentController.updateCommentById);
router.delete(
  "/:id",
  verifyTokenMiddleware,
  CommentController.deleteCommentById,
);

router.post(
  "/downvote",
  verifyTokenMiddleware,
  CommentController.createDownvote,
);
router.delete(
  "/:id/downvote",
  verifyTokenMiddleware,
  CommentController.deleteDownvote,
);

router.post("/upvote", verifyTokenMiddleware, CommentController.createUpvote);
router.delete(
  "/:id/upvote",
  verifyTokenMiddleware,
  CommentController.createUpvote,
);

module.exports = router as Router;
