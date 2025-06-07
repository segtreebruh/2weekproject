import config from "../config";
import Contact from '../models/contact';
import User from "../models/user";
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const getAllContact = async (req: Request, res: Response, next: NextFunction) => {
  const contacts = await Contact.find({}).populate("belongsTo", { username: 1, name: 1 });
  res.json(contacts);
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

export const addNewContact = async (req: Request, res: Response, next: NextFunction) => { 
  const request = req as any;
  const { name, number } = request.body;
  const token = request.token;

  const decodedToken = jwt.verify(token, config.SECRET_KEY) as any;
  const id = decodedToken.id;

  if (!id) return void res.status(401).send({ error: "invalid token" });
  
  if (!name) {
    return void res.status(400).send({ error: "Name is required" });
  }

  const user = await User.findById(id);
  if (!user) return void res.status(400).send({ error: "missing userId/invalid" });
  
  const contact = new Contact({
    name,
    number,
    belongsTo: id
  });

  console.log("ok");

  try {
    const newContact = await contact.save();
    user.contacts = user.contacts.concat(newContact._id);

    res.status(201).json(newContact);
    await user.save();
  } catch (err) {
    next(err);
  }
}

