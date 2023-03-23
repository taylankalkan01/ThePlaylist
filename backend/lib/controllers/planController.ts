import { Request, Response } from "express";
import Plan from "../models/Plan";
import { createPlanInput } from "../schemas/plan/planValidation";
import { z } from "zod";

//admin can create a plan
const createPlan = async (req: Request, res: Response) => {
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

export default {
  createPlan
};
