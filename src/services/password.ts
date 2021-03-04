import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

//switch from callback implementation to promise implementation
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    //return both hashed password and the salt
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    //destructure hashed password and salt
    const [hashedPassword, salt] = storedPassword.split('.');

    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    //return boolean
    return buf.toString('hex') === hashedPassword;
  }
}