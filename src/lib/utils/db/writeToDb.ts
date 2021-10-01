import { Low, JSONFile } from 'lowdb';
import { dbPath } from '../../../app';
import { AuthData } from '../../types';
import { readFromDb } from './readFromDb';

/**
 * Function used to write to database(JSON) file
 * in this case
 * @param {AuthData} data to be written to the DB
 */
export async function writeToDb(data: AuthData): Promise<void> {
  const existingData = await readFromDb();
  existingData.installs.push(data);
  // Creates a new DB if one doesn't already exists
  const adapter = new JSONFile(dbPath);
  const db = new Low(adapter);
  db.data = existingData;
  return db.write();
}
