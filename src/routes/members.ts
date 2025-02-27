import { Router } from "express";
import { verifyTokenMiddleware } from "src/middleware/authMiddleware";
import MemberController from "@controllers/MemberController";

const router: Router = Router();

router.post("/", verifyTokenMiddleware, MemberController.addMember);
router.delete("/", verifyTokenMiddleware, MemberController.removeMember);

module.exports = router as Router;
