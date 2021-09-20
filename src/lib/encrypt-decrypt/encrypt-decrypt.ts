import Cryptr from 'cryptr';
import { Envars } from '../types';

export class EncryptDecrypt {
  private secret: string;
  private cryptr: Cryptr;

  constructor(secret: string) {
    this.secret = secret || (process.env[Envars.EncryptionSecret] as string);
    this.cryptr = new Cryptr(this.secret);
  }

  public encryptString(message: string): string {
    return this.cryptr.encrypt(message);
  }
  public decryptString(encryptedString: string): string {
    return this.cryptr.decrypt(encryptedString);
  }
}
