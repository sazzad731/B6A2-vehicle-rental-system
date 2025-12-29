import { Request, Response } from "express";
import { usersServices } from "./user.service";


const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}



const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email, role } = req.user!;
  try {
    const result = await usersServices.updateUser(userId as string, email, role, req.body);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found or you don't have permission to update",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0]
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}



const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await usersServices.deleteUser(userId as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found or can't be delete"
      })
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
  }
}



export const usersController = {
  getAllUsers,
  updateUser,
  deleteUser,
};