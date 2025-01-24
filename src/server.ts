import epxress from 'express';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './config/db';
import contactRoutes from './routes/contactRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';

const PORT = process.env.PORT || 9000;

const app = epxress();

app.use(epxress.json());

// Routes middleware
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
