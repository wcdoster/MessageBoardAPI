import { Router } from "express";
import UserController from "@controllers/UserController";

const router: Router = Router();

router.get("/:id", UserController.getUserById);

module.exports = router as Router;
