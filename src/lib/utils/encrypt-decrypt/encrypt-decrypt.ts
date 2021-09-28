import Cryptr from 'cryptr';
import { Envars } from '../../types';

/**
 * Small class used to encrypt data with an encryption secret
 * The class has two members
 * 1. secret: Key used to encrypt data
 * 2. cryptr: Instace of the Cryptr library
 */
export class EncryptDecrypt {
  private secret: string;
  private cryptr: Cryptr;

  constructor(secret: string) {
    // Uses the passed secret or one from environmental variables
    this.secret = secret || (process.env[Envars.EncryptionSecret] as string);
    // Initialize the Cryptr instance with the secret
    this.cryptr = new Cryptr(this.secret);
  }

  /**
   * Function used to encrypt data
   * @param {String} message to be encrypted
   * @returns {String} encrypter message
   */
  public encryptString(message: string): string {
    return this.cryptr.encrypt(message);
  }
  /**
   * Function used to decrypt data
   * @param  {String} encryptedString to be decrypted
   * @returns {String} decrypted string
   */
  public decryptString(encryptedString: string): string {
    return this.cryptr.decrypt(encryptedString);
  }
}
