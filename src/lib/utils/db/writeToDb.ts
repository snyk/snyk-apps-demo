import { Low, JSONFile } from 'lowdb';
import { dbPath } from '../../../app';
import { AuthData } from '../../types';

export async function writeToDb(data: AuthData) {
  const adapter = new JSONFile(dbPath);
  const db = new Low(adapter);
  db.data = data;
  await db.write();
}
