import { execSync } from 'child_process';

export const run = (args: string): string => {
  return execSync(`ts-node src/scripts/create-app.ts ${args}`).toString();
};
