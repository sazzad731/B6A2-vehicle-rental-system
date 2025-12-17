import { Router } from "express";
import { usersController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/users", auth("admin"), usersController.getAllUsers);



router.put("/users/:userId", auth("admin", "customer"), usersController.updateUser);


router.delete("/users/:userId", auth("admin"), usersController.deleteUser);







export const usersRoutes = router;