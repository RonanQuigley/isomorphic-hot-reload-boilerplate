import { Pool } from 'pg';
import config from './config.json';

const pool = new Pool(config.dev);

export const query = async () => {
    return await pool.query(`SELECT 'HelloPostgres'::text`);
};
