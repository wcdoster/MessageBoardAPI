import { Router } from "express";
import UserController from "@controllers/UserController";

const router: Router = Router();

router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);

module.exports = router as Router;
