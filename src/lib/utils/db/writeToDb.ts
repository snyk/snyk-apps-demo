import { Low, JSONFile } from 'lowdb';
import { join } from 'path';

export async function writeToDb(data: any) {
  const dbFile = join(__dirname, '../../../../db/db.json');
  const adapter = new JSONFile(dbFile);
  const db = new Low(adapter);
  db.data = data;
  await db.write();
}
