import { pool } from "../../config/db"

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  try {
    await pool.query("BEGIN");

    const vehicleInfo = await pool.query(
      `SELECT id, vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id=$1`,
      [vehicle_id]
    );

    if (vehicleInfo.rowCount === 0) {
      throw new Error("Vehicle not found");
    }

    const vehicle = vehicleInfo.rows[0];

    if (vehicle.availability_status !== "available") {
      throw new Error("Vehicle is not available");
    }

    // calculate date
    const start = new Date(rent_start_date as string);
    const end = new Date(rent_end_date as string);

    const diffTime = end.getTime() - start.getTime();
    const totalDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    if (totalDays <= 0) {
      throw new Error("Invalid booking dates");
    }

    const totalPrice = totalDays * Number(vehicle.daily_rent_price);

    const bookingResult = await pool.query(
      `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
    );

    await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [
      "booked",
      vehicle_id,
    ]);

    await pool.query("COMMIT");

    return {
      ...bookingResult.rows[0],
      vehicle: {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: vehicle.daily_rent_price,
      },
    };
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
}



const getBookings = async (email: string, role: string) => {
  if (role === "admin") {
    const result = await pool.query(`
      SELECT 
        b.id,
        b.customer_id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,

        json_build_object(
          'name', u.name,
          'email', u.email
        ) AS customer,

        json_build_object(
          'vehicle_name', v.vehicle_name,
          'registration_number', v.registration_number
        ) AS vehicle

      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
      `
    );
    return result.rows;
  }

  const result = await pool.query(
    `
    SELECT 
    b.id,
    b.vehicle_id,
    b.rent_start_date,
    b.rent_end_date,
    b.total_price,
    b.status,

    json_build_object(
      'vehicle_name', v.vehicle_name,
      'registration_number', v.registration_number,
      'type', v.type
    ) AS vehicle

  FROM bookings b
  JOIN users u ON b.customer_id = u.id
  JOIN vehicles v ON b.vehicle_id = v.id

  WHERE u.email = $1
  `,
    [email]
  );

  return result.rows;
}




const updateBooking = async (bookingId: string, status: string, email: string, role: string) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const bookingInfo = await client.query(
      `
      SELECT b.*, u.email
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      WHERE b.id = $1
      `,
      [bookingId]
    );

    if (bookingInfo.rowCount === 0) {
      throw new Error("Booking not found");
    }

    const booking = bookingInfo.rows[0];

    if (role === "customer") {
      if (booking.email !== email) {
        throw new Error("You can only update your own booking");
      }

      if (status !== "cancelled") {
        throw new Error("Customers can only cancel bookings");
      }

      const today = new Date();
      const startDate = new Date(booking.rent_start_date);

      if (today >= startDate) {
        throw new Error("Cannot cancel after start date");
      }

      await client.query(
        `UPDATE bookings SET status = 'cancelled' WHERE id = $1`,
        [bookingId]
      );

      await client.query(
        `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
        [booking.vehicle_id]
      );
    }

    if (role === "admin") {
      if (status !== "returned") {
        throw new Error("Admin can only set status to returned");
      }

      await client.query(
        `UPDATE bookings SET status = 'returned' WHERE id = $1`,
        [bookingId]
      );

      await client.query(
        `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
        [booking.vehicle_id]
      );
    }

    await client.query("COMMIT");

    const bookings = await client.query(
      `SELECT * FROM bookings WHERE id = $1`,
      [bookingId]
    );

    const vehicle = await client.query(
      `SELECT availability_status FROM vehicles WHERE id=$1`,
      [bookings.rows[0].vehicle_id]
    );

    const result = [booking, vehicle.rows[0]]

    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};





export const bookingsServices = {
  createBooking,
  getBookings,
  updateBooking,
};