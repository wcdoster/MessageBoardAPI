import { Router } from "express";
import PostController from "@controllers/PostController";
import { verifyTokenMiddleware } from "src/middleware/authMiddleware";

const router: Router = Router();

router.get("/:id", PostController.getPostById);
router.post("/", verifyTokenMiddleware, PostController.createPost);

module.exports = router as Router;
