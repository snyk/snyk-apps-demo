import { dbPath } from '../../../app';
import { AuthData, DB } from '../../types';
import { Low, JSONFile } from 'lowdb';
/**
 * Function used to update the installs stored in the database
 * @param {AuthData} oldData Old data that needs updation
 * @param {AuthData} newData New data
 * @returns {Boolean} True is db update was success, false otherwise
 */
export async function updateDb(oldData: AuthData, newData: AuthData): Promise<boolean> {
  const adapter = new JSONFile<DB>(dbPath);
  const db = new Low<DB>(adapter);
  await db.read();
  if (db.data == null) {
    return false;
  }
  // After reading check if data exists in the database
  const installs = db.data?.installs || [];

  const index = installs.findIndex((install) => install.date === oldData.date);
  if (index === -1) return false;
  installs[index] = newData;
  // Replace the existing install with new one
  db.data.installs = installs;
  await db.write();
  return true;
}
