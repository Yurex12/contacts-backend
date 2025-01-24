import { Router } from 'express';
import {
  currentUser,
  loginUser,
  registerUser,
} from '../controllers/userController';
import validateToken from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';
import { userSchema } from '../schemas/userSchema';

const router = Router();

router.post('/register', validateData(userSchema), registerUser);

router.post('/login', loginUser);

router.get('/current', validateToken, currentUser);
export default router;
