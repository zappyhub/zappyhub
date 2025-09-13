import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './modules/users/routes/userRoutes';
import authRoutes from './modules/auth/routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { globalLimiter } from './middlewares/rateLimit';
import { authenticate } from './middlewares/authenticate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Limite global simples
app.use(globalLimiter);

// Rotas públicas
app.use('/auth', authRoutes);

// Rotas privadas
app.use('/users', authenticate, userRoutes);

// Middleware global de erros (sempre por último)
app.use(errorHandler);

export default app;

