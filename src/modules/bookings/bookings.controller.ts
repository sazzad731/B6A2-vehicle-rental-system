import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.createBooking(req.body);
    console.log(result);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



const getBookings = async (req: Request, res: Response) => {
  const { email, role } = req.user!;
  try {
    const result = await bookingsServices.getBookings(email, role);
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
  }
}




const updateBooking = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  const { role, email } = req.user!;

  try {
    const result = await bookingsServices.updateBooking(bookingId as string, status, email, role);
    res.status(200).json({
      success: true,
      message: role === "admin" ? "Booking marked as returned. Vehicle is now available" : "Booking cancelled successfully",
      data: result.rows[0]
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}


export const bookingsController = {
  createBooking,
  getBookings,
  updateBooking,
};