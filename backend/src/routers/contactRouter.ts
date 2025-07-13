import {
  getAllContacts, 
  getById,
  addNewContacts
} from '../controllers/contactController';
import { Router } from 'express';

const contactRouter = Router();

contactRouter.get('/', getAllContacts);
contactRouter.get('/:id', getById);
contactRouter.post('/', addNewContacts);

export default contactRouter;
