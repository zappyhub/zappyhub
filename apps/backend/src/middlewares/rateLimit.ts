import rateLimit from 'express-rate-limit';

// Limite global: protege API contra abuso casual
export const globalLimiter = rateLimit({
  windowMs: 60_000, // 1 minuto
  max: 200,         // 200 req/min por IP
  standardHeaders: true,
  legacyHeaders: false
});

// Limite mais rígido para rotas sensíveis (login/refresh)
export const authLimiter = rateLimit({
  windowMs: 60_000,
  max: 10, // 10 tentativas/min por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Muitas tentativas, tente novamente em instantes.' }
});

