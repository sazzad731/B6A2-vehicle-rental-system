import { Router } from "express";
import { bookingsController } from "./bookings.controller";
import auth from "../../middleware/auth";

const router = Router();


router.post("/bookings", auth("admin", "customer"), bookingsController.createBooking);



router.get("/bookings", auth("admin", "customer"), bookingsController.getBookings);



router.put("/bookings/:bookingId", auth("admin", "customer"), bookingsController.updateBooking);


export const bookingsRoutes = router