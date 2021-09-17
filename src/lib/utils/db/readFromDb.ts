import { Low, JSONFile } from 'lowdb';
import { join } from 'path';
import { AuthData } from '../../types';

export async function readFromDb() {
  const dbFile = join(__dirname, '../../../../db/db.json');
  const adapter = new JSONFile<AuthData>(dbFile);
  const db = new Low<AuthData>(adapter);
  await db.read();
  return db.data;
}
