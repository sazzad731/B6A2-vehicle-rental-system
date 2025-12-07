import { pool } from "../../config/db";


const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
}




const updateUser = async (id: string, userEmail: string, payload: Record<string, unknown>) => {
  const {name, email, phone, role} = payload;
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 AND (email=$6 OR role=$7) RETURNING *`,
    [name, email, phone, role, id, userEmail, "admin"]
  );
  return result;
}




export const usersServices = {
  getAllUsers,
  updateUser,
};