import { config } from 'dotenv';
config();
const { env } = process;

export const cfg = {
  server: { port: env.PORT! },
};
