import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_string}`,
});

const initDB = async () => {
  // users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone VARCHAR(15) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('admin', 'customer'))
    )
    `);

  // Vehicles table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    daily_rent_price NUMERIC(10, 2) CHECK (daily_rent_price > 0) NOT NULL,
    availability_status VARCHAR(20) DEFAULT 'available' CHECK (availability_status IN ('available', 'booked'))
    )
    `);

  // Bookings table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings(
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
    rent_start_date DATE NOT NULL,
    rent_end_date DATE NOT NULL,
    CHECK (rent_end_date > rent_start_date),
    total_price NUMERIC(10, 2)  NOT NULL CHECK (total_price > 0),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'returned'))
    )
    `);
};

export default initDB;
