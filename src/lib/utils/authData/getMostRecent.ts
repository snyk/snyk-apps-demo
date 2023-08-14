import { AuthData } from '../../types/db';

/**
 * @param {AuthData[]} installs get most recent install from list of installs
 * @returns the latest install or void
 */
export function getMostRecentInstall(installs: AuthData[]): AuthData | void {
  if (installs) {
    return installs[installs.length - 1];
  }
  return;
}
