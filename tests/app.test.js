import request from 'supertest';
import app from '../app.js';

describe('App Integration Tests', () => {
  describe('GET /', () => {
    it('should serve React app for root route', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/text\/html/);
    });
  });

  describe('API Routes', () => {
    it('should return 404 for non-existent API route', async () => {
      const response = await request(app).get('/api/nonexistent');
      expect(response.status).toBe(404);
    });

    it('should have CORS headers', async () => {
      const response = await request(app).get('/api/auth');
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 errors properly', async () => {
      const response = await request(app).get('/nonexistent-route');
      expect(response.status).toBe(404);
    });
  });
}); 