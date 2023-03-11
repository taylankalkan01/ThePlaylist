import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import {
  registerUserInput,
  registerAdminInput
} from "../schemas/auth/authValidation";
import { generateToken } from "../helpers/token/generateToken";

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, dob, email, password, phone } = req.body;

  try {
    //validation
    registerUserInput.parse(req.body);

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
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};
const registerAdmin = async (req: Request, res: Response) => {
  const { firstName, lastName, password, dob, email } = req.body;

  try {
    //validation
    registerAdminInput.parse(req.body);

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
      isAdmin: true
    });

    const data = await newAdmin.save();

    res.status(201).json({
      error: false,
      message: "Admin Account Created Succesfully!",
      data: data
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //validation

    //find user and check email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "Email or Password is wrong" });
    }

    //check password
    const checkPass = await bcrypt.compare(password,user.password)
    if(!checkPass){
      return res
        .status(400)
        .json({ error: true, message: "Email or Password is wrong" });
    }

    //generate token
   let token = await generateToken(user)

    //send cookie
    res.cookie("userJWT", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax", //cross-site cookie ** boolean | 'lax' | 'strict' | 'none' | undefined;
      maxAge: 24 * 60 * 60 * 1000, //maxAge = 1 day
      // signed: true
      // path?: string | undefined;
      // domain?: string | undefined;
    });

    //response
    res.status(200).json({
      error: false,
      message: "User Login Succesfully!",
      data: user,
      token: token,
    });

  } catch (err) {
    res.status(500).json({
      error: true,
      message: `${process.env.NODE_ENV === "production" ? null : err}`
    });
  }
};

export default {
  registerUser,
  registerAdmin,
  loginUser
};
