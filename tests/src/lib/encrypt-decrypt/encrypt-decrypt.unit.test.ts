import { EncryptDecrypt } from '../../../../src/lib/utils';

describe('Encrypt and decrypt the string', () => {
  const stringToEncrypt: string = 'test';
  it('should encrypt the string correctly', () => {
    const eD = new EncryptDecrypt('secret');
    const encryptedString = eD.encryptString(stringToEncrypt);
    const decryptedString = eD.decryptString(encryptedString);
    expect(decryptedString).toBe(stringToEncrypt);
  });
});
