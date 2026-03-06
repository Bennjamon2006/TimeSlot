// src/__tests__/e2e/auth.e2e.test.ts
// E2E tests for Auth endpoints

import request from 'supertest';
import { Express } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from './setup';

describe('Auth E2E', () => {
  let app: Express;

  beforeAll(async () => {
    app = (await import('@/app')).default;
  });

  describe('POST /api/auth/login', () => {
    it('should return 200 and token on valid credentials', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await prisma.user.create({
        data: {
          email: 'test@test.com',
          password: hashedPassword,
          name: 'Test User',
        },
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 on invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@test.com', password: 'password123' });

      expect(response.status).toBe(401);
    });

    it('should return 401 on invalid password', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await prisma.user.create({
        data: {
          email: 'test2@test.com',
          password: hashedPassword,
          name: 'Test User',
        },
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test2@test.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
    });

    it('should return 400 on missing email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ password: 'password123' });

      expect(response.status).toBe(400);
    });

    it('should return 400 on missing password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com' });

      expect(response.status).toBe(400);
    });
  });
});
