import { getAllUsers, getById } from '../controllers/userController';
import { Router } from 'express';

const userRouter = Router();
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getById);

export default userRouter;
