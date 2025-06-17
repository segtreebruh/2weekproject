import User from "../models/user";
import { Request, Response, NextFunction } from "express";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({}).populate("contacts", { name: 1, number: 1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).populate("contacts", { name: 1, number: 1 });
    if (!user) {
      return void res.status(404).send({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

