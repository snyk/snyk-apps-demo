import { Low, JSONFile } from 'lowdb';
import { dbPath } from '../../../app';
import { AuthData } from '../../types';
import { readFromDb } from './readFromDb';

export async function writeToDb(data: AuthData) {
  const existingData = await readFromDb();
  existingData.installs.push(data);

  const adapter = new JSONFile(dbPath);
  const db = new Low(adapter);
  db.data = existingData;
  await db.write();
}
