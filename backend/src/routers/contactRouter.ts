import {
  getAllContact, 
  getById,
  addNewContact
} from '../controllers/contactController';
import { Router } from 'express';

const contactRouter = Router();

contactRouter.get('/', getAllContact);
contactRouter.get('/:id', getById);
contactRouter.post('/', addNewContact);

export default contactRouter;
