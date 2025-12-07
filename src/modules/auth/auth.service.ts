import { pool } from "../../config/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "../../config";


const signupUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const lowercaseEmail = (email as string).toLowerCase();
  const hashedPassword = await bcrypt.hash(password as string, 10);

  if ((password as string).length < 6) {
    return false;
  }

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, lowercaseEmail, hashedPassword, phone, role]
  );

  return result;
};



const signinUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return false;
  }

  const token = jwt.sign({ name: user.name, email: user.email, role: user.role }, config.jwt_secret as string);

  return { token, user };
}


export const authService = {
  signupUser,
  signinUser,
};