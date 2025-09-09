import request from 'supertest';
import app from '../../../src/app.js';
import { ProductModel } from '../../../src/model/ProductModel.js';

describe('Product Controller', () => {
  const validProductData = {
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    category: '507f1f77bcf86cd799439011', // Dummy ObjectId
    quantity: 10
  };

  describe('POST /api/v1/products', () => {
    it('should create a new product', async () => {
      const response = await request(app)
        .post('/api/v1/products')
        .send(validProductData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(validProductData.name);
    });

    it('should not create product with invalid data', async () => {
      const invalidProduct = {
        name: 'Test Product',
        // Missing required fields
      };

      const response = await request(app)
        .post('/api/v1/products')
        .send(invalidProduct);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/products/:id', () => {
    let productId;

    beforeEach(async () => {
      const product = await ProductModel.create(validProductData);
      productId = product._id;
    });

    it('should update an existing product', async () => {
      const updateData = {
        name: 'Updated Product Name',
        price: 199.99
      };

      const response = await request(app)
        .put(`/api/v1/products/${productId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.price).toBe(updateData.price);
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .put(`/api/v1/products/${fakeId}`)
        .send({ name: 'Updated Name' });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
