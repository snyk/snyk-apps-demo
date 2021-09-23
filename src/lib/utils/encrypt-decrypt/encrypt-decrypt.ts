import Cryptr from 'cryptr';
import { Config } from '../../types';
import config from 'config';

export class EncryptDecrypt {
  private secret: string;
  private cryptr: Cryptr;

  constructor(secret: string) {
    this.secret = secret || config.get(Config.EncryptionSecret);
    this.cryptr = new Cryptr(this.secret);
  }

  public encryptString(message: string): string {
    return this.cryptr.encrypt(message);
  }
  public decryptString(encryptedString: string): string {
    return this.cryptr.decrypt(encryptedString);
  }
}
