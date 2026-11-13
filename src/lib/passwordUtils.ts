// Secure Password Hashing & Verification using Web Crypto API (PBKDF2 / SHA-256)
// Complies with requirements: No plaintext passwords, salted hashing, rate limiting, session token generation.

/**
 * Generate a random salt string
 */
export function generateSalt(length = 16): string {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash password with salt using PBKDF2 (SHA-256)
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: 'SHA-256'
    },
    passwordKey,
    256
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify password against stored hash and salt
 */
export async function verifyPassword(password: string, salt: string, storedHash: string): Promise<boolean> {
  if (!password || !salt || !storedHash) return false;
  const computedHash = await hashPassword(password, salt);
  return computedHash === storedHash;
}

/**
 * Generate a secure cryptographically random session token
 */
export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Client-side rate limiter for password attempts (per album)
 */
const attemptCounts: Record<string, { count: number; lockedUntil: number }> = {};

export function checkRateLimit(albumId: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const record = attemptCounts[albumId];

  if (record && record.lockedUntil > now) {
    const remaining = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingSeconds: remaining };
  }

  return { allowed: true };
}

export function recordFailedAttempt(albumId: string): { locked: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const record = attemptCounts[albumId] || { count: 0, lockedUntil: 0 };
  record.count += 1;

  if (record.count >= 5) {
    // Lock for 60 seconds after 5 failed attempts
    record.lockedUntil = now + 60 * 1000;
    record.count = 0;
    attemptCounts[albumId] = record;
    return { locked: true, remainingSeconds: 60 };
  }

  attemptCounts[albumId] = record;
  return { locked: false };
}

export function resetRateLimit(albumId: string) {
  delete attemptCounts[albumId];
}
