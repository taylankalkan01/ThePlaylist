import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, dob, email, password, phone } = req.body;
  try {
    //validation TODO

    //check if email is exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: true,
        message: "You cannot register, Email already exist"
      });
    }
    //hash password
    const saltPass = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, saltPass);

    //register user
    const newUser = new User({
      firstName,
      lastName,
      dob,
      email,
      password: hashPass,
      phone
    });

    const data = await newUser.save();

    res.status(201).json({
      error: false,
      message: "User Account Created Succesfully!",
      data: data
    });
  } catch (err) {
    res
      .status(500)
      .json({
        error: true,
        message: `${process.env.NODE_ENV === "production" ? null : err}`
      });
  }
};
const registerAdmin = async (req: Request, res: Response) => {
  const { firstName, lastName,password, dob, email} = req.body;
  try {
    //validation TODO

    //check if email is exists
    const admin = await User.findOne({ email });
    if (admin) {
      return res.status(400).json({
        error: true,
        message: "You cannot create admin, Email already exist"
      });
    }
    //hash password
    const saltPass = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, saltPass);

    //register admin
    const newAdmin = new User({
      firstName,
      lastName,
      dob,
      email,
      password: hashPass,
      isAdmin:true
    });

    const data = await newAdmin.save();

    res.status(201).json({
      error: false,
      message: "Admin Account Created Succesfully!",
      data: data
    });
  } catch (err) {
    res
      .status(500)
      .json({
        error: true,
        message: `${process.env.NODE_ENV === "production" ? null : err}`
      });
  }
};

export default {
  registerUser,registerAdmin
};
