import { readFromDb } from '../db';
import { AuthData } from '../../types/db';

/**
 * @param {AuthData[]} installs get most recent install from list of installs
 * @returns the latest install or void
 */
export async function getMostRecentInstall(): Promise<AuthData | void> {
  const { installs } = await readFromDb();

  if (installs) {
    return installs[installs.length - 1];
  }
  return;
}
