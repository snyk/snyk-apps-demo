import { Low, JSONFile } from 'lowdb';
import { AuthData } from '../../types';
import { dbPath } from '../../../app';

export async function readFromDb() {
  const adapter = new JSONFile<AuthData>(dbPath);
  const db = new Low<AuthData>(adapter);
  await db.read();
  return db.data;
}
