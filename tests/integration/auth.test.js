import { describe, it, expect, beforeAll } from 'vitest';
import { login, register } from '../../src/auth.js';
import { getDb } from '../../src/db.js';

describe('Local Authentication System', () => {
  beforeAll(() => {
    // Setup initial user for testing
    register('admin', 'password123');
  });

  it('should reject incorrect passwords', async () => {
    const result = await login('admin', 'wrong_password');
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid password');
  });

  it('should reject non-registered users', async () => {
    const result = await login('unknown_user', 'any_password');
    expect(result.success).toBe(false);
    expect(result.message).toBe('User not found');
  });

  it('should allow access to registered users with correct passwords', async () => {
    const result = await login('admin', 'password123');
    expect(result.success).toBe(true);
    expect(result.user.username).toBe('admin');
  });
});