import { pool } from "../../config/db";


const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
}




const updateUser = async (id: string, userEmail: string, userRole: string, payload: Record<string, unknown>) => {
  const { name, email, phone } = payload;
  let { role } = payload;
  if (userRole !== "admin") {
    role = null;
  }
  const result = await pool.query(
    `UPDATE users 
     SET name=$1, email=$2, phone=$3, role=COALESCE($4, role) 
     WHERE id=$5 AND (email=$6 OR $7 = 'admin') 
     RETURNING *`,
    [name, email, phone, role, id, userEmail, userRole]
  );
  return result;
}




const deleteUser = async (id: string) => {
  const result = await pool.query(
    `
  DELETE FROM users u
  WHERE u.id = $1
  AND NOT EXISTS (
    SELECT 1
    FROM bookings b
    WHERE b.customer_id = u.id
    AND b.status = 'active'
  )
  `,
    [id]
  );
  return result
}




export const usersServices = {
  getAllUsers,
  updateUser,
  deleteUser,
};