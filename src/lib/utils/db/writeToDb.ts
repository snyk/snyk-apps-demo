import { Low, JSONFile } from 'lowdb';
import { dbPath } from '../../../app';

export async function writeToDb(data: any) {
  const adapter = new JSONFile(dbPath);
  const db = new Low(adapter);
  db.data = data;
  await db.write();
}
