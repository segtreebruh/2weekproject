import { register } from "../controllers/registerController";
import { Router } from "express";

const regsiterRouter = Router();

regsiterRouter.post('/', register);

export default regsiterRouter;
