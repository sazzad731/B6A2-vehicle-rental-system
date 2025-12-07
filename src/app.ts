import express, { Request, Response } from 'express';
import initDB from './config/db';
import { authRoutes } from './modules/auth/auth.routes';
import { usersRoutes } from './modules/users/users.routes';
import { vehiclesRoutes } from './modules/vehicles/vehicles.routes';
import { bookingsRoutes } from './modules/bookings/bookings.routes';
const app = express();


// parser
app.use(express.json());


initDB();


app.get('/', (req: Request, res: Response) => {
  res.send('Vehicle Rental System is running!');
});


app.use("/api/v1/auth", authRoutes);



app.use("/api/v1", usersRoutes);



app.use("/api/v1", vehiclesRoutes);



app.use("/api/v1", bookingsRoutes);




export default app;