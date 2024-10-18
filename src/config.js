/*import { config } from 'dotenv';

// Cargar las variables del archivo .env
config();

export const PORT = process.env.PORT || 3000
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'cdlsr'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'sprmr4535'
export const DB_NAME = process.env.DB_NAME || 'NewSpot'
export const DB_PORT = parseInt(process.env.DB_PORT,10) || 1433*/

import { config } from 'dotenv';

// Cargar las variables del archivo .env
config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:iIFBxqCbVBgOHKSMbLNFoXguUhyumcMT@autorack.proxy.rlwy.net:12822/railway';

//'postgres://postgres:sprmr453@localhost:5432/Swifties';