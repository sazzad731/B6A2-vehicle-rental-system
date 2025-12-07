import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

const addVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.addVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getAllVehicles();
    res.status(200).json({
      success: true,
      message: result.rows.length ? "Vehicles retrieved successfully" : "No vehicles found",
      data: result.rows
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}




const getVehiclesById = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await vehiclesServices.getVehiclesById(vehicleId as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}




const updateVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await vehiclesServices.updateVehicle(vehicleId as string, req.body);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}



const deleteVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await vehiclesServices.deleteVehicle(vehicleId as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle can't be delete or not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}




export const vehiclesControllers = {
  addVehicle,
  getAllVehicles,
  getVehiclesById,
  updateVehicle,
  deleteVehicle
};