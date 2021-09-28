import { Low, JSONFile } from 'lowdb';
import { DB } from '../../types';
import { dbPath } from '../../../app';

/**
 * Read data from DB, you could use any database of your
 * choice, but we are using lightweight lowdb for
 * this demo
 * @returns Promise with DB
 */
export async function readFromDb(): Promise<DB> {
  const adapter = new JSONFile<DB>(dbPath);
  const db = new Low<DB>(adapter);
  await db.read();
  // Return existing data or create a new DB
  return db.data ?? buildNewDb();
}

/**
 * @returns DB instance of lowdb
 */
function buildNewDb(): DB {
  return { installs: [] };
}
