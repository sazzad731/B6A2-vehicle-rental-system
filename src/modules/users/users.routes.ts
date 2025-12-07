import { Router } from "express";
import { usersController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/users", auth("admin"), usersController.getAllUsers);



router.put("/users/:userId", auth("admin", "customer"), usersController.updateUser);







export const usersRoutes = router;