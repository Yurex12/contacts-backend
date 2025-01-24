import { Router } from 'express';
import validateToken from '../middlewares/validateTokenHandler';
import {
  getContact,
  getContacts,
  updateContact,
  deleteContact,
  createContact,
} from '../controllers/contactController';
import { validateData } from '../middlewares/validation';
import { contactSchema } from '../schemas/contactSchema';

const router = Router();

router.use(validateToken);
router
  .get('/', getContacts)
  .post('/', validateData(contactSchema), createContact);
router
  .get('/:id', getContact)
  .put('/:id', validateData(contactSchema), updateContact)
  .delete('/:id', deleteContact);

export default router;
