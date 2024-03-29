import { Request, Response } from "express";
import Plan from "../models/Plan";
import { createPlanInput } from "../schemas/plan/planValidation";
import { z } from "zod";

//admin can create a plan
const createPlanAdmin = async (req: Request, res: Response) => {
  const { isActive, planType, price } = req.body;

  try {
    //validation
    createPlanInput.parse(req.body);

    const newPlan = new Plan({
      planType,
      price,
      isActive
    });

    const data = await newPlan.save();

    res.status(201).json({
      error: false,
      message: "Membership Plan Created Succesfully!",
      data: data
    });
  } catch (err) {
    //validation error
    if (err instanceof z.ZodError) {
      const formattedErrors = err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message
      }));
      return res.status(422).json({
        error: true,
        message: "Validation failed",
        data: formattedErrors
      });
    }
    //An error occurred while processing your request
    return res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};

//user and admin can view all plans
const getAllPlans = async (req: Request, res: Response) => {
  try {
    const data = await Plan.find();

    res.status(200).json({
      error: false,
      message: "All Plans are listed Succesfully!",
      data: data
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};
const getAllPlansAdmin = async (req: Request, res: Response) => {
  try {
    const data = await Plan.find();

    res.status(200).json({
      error: false,
      message: "All Plans are listed for admin Succesfully!",
      data: data
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};

//user and admin can view plan by id
const getPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await Plan.findById(id);

    res.status(200).json({
      error: false,
      message: `Plan with id: '${id}' is listed Succesfully!`,
      data: data
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};

const getPlanByIdAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await Plan.findById(id);

    res.status(200).json({
      error: false,
      message: `Plan with id: '${id}' is listed for admin Succesfully!`,
      data: data
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};

//admin can delete plan by id
const deletePlanByIdAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await Plan.findByIdAndDelete(id);

    res.status(200).json({
      error: false,
      message: `Plan with id: '${id}' is deleted for admin Succesfully!`,
      data: data
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};

const deleteAllPlansAdmin = async (req: Request, res: Response) => {
  try {
    const data = await Plan.deleteMany();
    if (data.deletedCount == 0) {
      return res.status(400).json({
        error: true,
        message: `There is no Plan in database.`,
        data: data.deletedCount
      });
    }

    res.status(200).json({
      error: false,
      message: `All Plans are deleted for admin Succesfully!`,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : error}`
    });
  }
};

//admin can update plan by id
const updatePlanByIdAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive, planType, price } = req.body;

  try {
    const data = await Plan.findByIdAndUpdate(
      id,
      {
        $set: {
          isActive: isActive,
          planType: planType,
          price: price
        }
      },
      { new: true }
    );

    res.status(200).json({
      error: false,
      message: `Plan with id: '${id}' is updated for admin Succesfully!`,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : error}`
    });
  }
};

export default {
  createPlanAdmin,
  getAllPlans,
  getAllPlansAdmin,
  deletePlanByIdAdmin,
  deleteAllPlansAdmin,
  getPlanById,
  getPlanByIdAdmin,
  updatePlanByIdAdmin
};
