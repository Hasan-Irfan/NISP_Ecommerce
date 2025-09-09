import request from 'supertest';
import app from '../../../src/app.js';
import { OrderModel } from '../../../src/model/OrderModel.js';

describe('Order Controller', () => {
  const validOrderData = {
    userId: '507f1f77bcf86cd799439011', // Dummy ObjectId
    items: [
      {
        productId: '507f1f77bcf86cd799439012',
        quantity: 2
      }
    ],
    totalAmount: 199.98,
    status: 'pending'
  };

  describe('POST /api/v1/orders', () => {
    it('should create a new order', async () => {
      const response = await request(app)
        .post('/api/v1/orders')
        .send(validOrderData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('pending');
    });

    it('should not create order with invalid data', async () => {
      const invalidOrder = {
        userId: '507f1f77bcf86cd799439011',
        // Missing required fields
      };

      const response = await request(app)
        .post('/api/v1/orders')
        .send(invalidOrder);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/orders/:id', () => {
    let orderId;

    beforeEach(async () => {
      const order = await OrderModel.create(validOrderData);
      orderId = order._id;
    });

    it('should get order by id', async () => {
      const response = await request(app)
        .get(`/api/v1/orders/${orderId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data._id.toString()).toBe(orderId.toString());
    });

    it('should return 404 for non-existent order', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/v1/orders/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/orders/:id/status', () => {
    let orderId;

    beforeEach(async () => {
      const order = await OrderModel.create(validOrderData);
      orderId = order._id;
    });

    it('should update order status', async () => {
      const response = await request(app)
        .put(`/api/v1/orders/${orderId}/status`)
        .send({ status: 'completed' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('completed');
    });
  });
});
