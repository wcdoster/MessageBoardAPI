import { Router } from "express";
import PostController from "@controllers/PostController";
import { verifyToken } from "src/middleware/authMiddleware";

const router: Router = Router();

router.get("/:id", PostController.getPostById);
router.post("/", verifyToken, PostController.createPost);

module.exports = router as Router;
