import { createHash, randomBytes, randomInt } from 'crypto';

export const randomTokens = (num: number) => {
  const randDigit = randomInt(1000, 999);
  return randDigit.toString().padStart(num, '0');
};

export function generateToken() {
  return randomBytes(32).toString('hex');
}

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
