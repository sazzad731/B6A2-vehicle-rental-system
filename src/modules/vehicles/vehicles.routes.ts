import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();


router.post("/vehicles", auth("admin"), vehiclesControllers.addVehicle);


router.get("/vehicles", vehiclesControllers.getAllVehicles);


router.get("/vehicles/:vehicleId", vehiclesControllers.getVehiclesById);


router.put("/vehicles/:vehicleId", auth("admin"), vehiclesControllers.updateVehicle);



router.delete("/vehicles/:vehicleId", auth("admin"), vehiclesControllers.deleteVehicle)


export const vehiclesRoutes = router;