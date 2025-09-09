import request from 'supertest';
import app from '../../../src/app.js';
import { ProductModel } from '../../../src/model/ProductModel.js';

describe('Inventory Controller', () => {
  let productId;
  
  beforeEach(async () => {
    const product = await ProductModel.create({
      name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      quantity: 10,
      category: '507f1f77bcf86cd799439011' // Dummy ObjectId
    });
    productId = product._id;
  });

  describe('PUT /api/v1/inventory/:id/add', () => {
    it('should add inventory to product', async () => {
      const response = await request(app)
        .put(`/api/v1/inventory/${productId}/add`)
        .send({ quantity: 5 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(15); // 10 + 5
    });

    it('should not add negative quantity', async () => {
      const response = await request(app)
        .put(`/api/v1/inventory/${productId}/add`)
        .send({ quantity: -5 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/inventory/:id/remove', () => {
    it('should remove inventory from product', async () => {
      const response = await request(app)
        .put(`/api/v1/inventory/${productId}/remove`)
        .send({ quantity: 3 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(7); // 10 - 3
    });

    it('should not remove more than available quantity', async () => {
      const response = await request(app)
        .put(`/api/v1/inventory/${productId}/remove`)
        .send({ quantity: 15 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/inventory/low-stock', () => {
    beforeEach(async () => {
      await ProductModel.create([
        {
          name: 'Low Stock Product',
          description: 'Test Description',
          price: 99.99,
          quantity: 2,
          category: '507f1f77bcf86cd799439011'
        },
        {
          name: 'Normal Stock Product',
          description: 'Test Description',
          price: 99.99,
          quantity: 20,
          category: '507f1f77bcf86cd799439011'
        }
      ]);
    });

    it('should get low stock products', async () => {
      const response = await request(app)
        .get('/api/v1/inventory/low-stock');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.some(product => product.name === 'Low Stock Product')).toBe(true);
    });
  });
});
