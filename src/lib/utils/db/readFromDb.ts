import { Low, JSONFile } from 'lowdb';
import { DB } from '../../types';
import { dbPath } from '../../../app';

export async function readFromDb(): Promise<DB> {
  const adapter = new JSONFile<DB>(dbPath);
  const db = new Low<DB>(adapter);
  await db.read();
  return db.data ?? buildNewDb();
}

function buildNewDb(): DB {
  return { installs: [] };
}
