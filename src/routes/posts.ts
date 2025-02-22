import { Router } from "express";
import PostController from "@controllers/PostController";

const router: Router = Router();

router.get("/:id", PostController.getPostById);
router.post("/", PostController.createPost);

module.exports = router as Router;
