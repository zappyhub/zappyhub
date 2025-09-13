import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
  console.error('Erro ao conectar no Redis:', err);
});

(async () => {
  await redisClient.connect();
  console.log('Redis conectado com sucesso');
})();

export default redisClient;

