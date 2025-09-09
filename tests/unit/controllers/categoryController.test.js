import request from 'supertest';
import app from '../../../src/app.js';
import { CategoryModel } from '../../../src/models/CategoryModel.js';

describe('Category Controller', () => {
  describe('POST /api/v1/categories', () => {
    it('should create a new category', async () => {
      const categoryData = {
        name: 'Test Category',
        description: 'Test Description'
      };

      const response = await request(app)
        .post('/api/v1/categories')
        .send(categoryData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(categoryData.name);
    });

    it('should not create category with duplicate name', async () => {
      const categoryData = {
        name: 'Test Category',
        description: 'Test Description'
      };

      await CategoryModel.create(categoryData);

      const response = await request(app)
        .post('/api/v1/categories')
        .send(categoryData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/categories', () => {
    beforeEach(async () => {
      await CategoryModel.create([
        { name: 'Category 1', description: 'Description 1' },
        { name: 'Category 2', description: 'Description 2' }
      ]);
    });

    it('should get all categories', async () => {
      const response = await request(app)
        .get('/api/v1/categories');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(2);
    });
  });
});
