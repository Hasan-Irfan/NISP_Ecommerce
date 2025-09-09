import request from 'supertest';
import app from '../../../src/app.js';
import { OrderModel } from '../../../src/model/OrderModel.js';
import { ProductModel } from '../../../src/model/ProductModel.js';

describe('Report Controller', () => {
  beforeEach(async () => {
    // Create test data
    const product1 = await ProductModel.create({
      name: 'Test Product 1',
      price: 100,
      quantity: 50,
      category: '507f1f77bcf86cd799439011'
    });

    const product2 = await ProductModel.create({
      name: 'Test Product 2',
      price: 200,
      quantity: 30,
      category: '507f1f77bcf86cd799439011'
    });

    await OrderModel.create([
      {
        userId: '507f1f77bcf86cd799439011',
        items: [
          { productId: product1._id, quantity: 2, price: 100 },
          { productId: product2._id, quantity: 1, price: 200 }
        ],
        totalAmount: 400,
        status: 'completed',
        createdAt: new Date('2025-09-01')
      },
      {
        userId: '507f1f77bcf86cd799439011',
        items: [
          { productId: product1._id, quantity: 1, price: 100 }
        ],
        totalAmount: 100,
        status: 'completed',
        createdAt: new Date('2025-09-02')
      }
    ]);
  });

  describe('GET /api/v1/reports/sales', () => {
    it('should get sales report for a date range', async () => {
      const response = await request(app)
        .get('/api/v1/reports/sales')
        .query({
          startDate: '2025-09-01',
          endDate: '2025-09-02'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('totalSales');
      expect(response.body.data).toHaveProperty('orderCount');
      expect(response.body.data.totalSales).toBe(500); // 400 + 100
      expect(response.body.data.orderCount).toBe(2);
    });
  });

  describe('GET /api/v1/reports/inventory', () => {
    it('should get inventory status report', async () => {
      const response = await request(app)
        .get('/api/v1/reports/inventory');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty('totalQuantity');
      expect(response.body.data[0]).toHaveProperty('lowStockItems');
    });
  });

  describe('GET /api/v1/reports/top-products', () => {
    it('should get top selling products', async () => {
      const response = await request(app)
        .get('/api/v1/reports/top-products')
        .query({
          startDate: '2025-09-01',
          endDate: '2025-09-02',
          limit: 5
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty('totalQuantitySold');
      expect(response.body.data[0]).toHaveProperty('totalRevenue');
    });
  });
});
