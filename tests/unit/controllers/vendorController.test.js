import request from 'supertest';
import app from '../../../src/app.js';
import { VendorModel } from '../../../src/model/VendorModel.js';

describe('Vendor Controller', () => {
  const validVendorData = {
    name: 'Test Vendor',
    email: 'vendor@test.com',
    phone: '1234567890',
    address: {
      street: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      zipCode: '12345'
    }
  };

  describe('POST /api/v1/vendors', () => {
    it('should create a new vendor', async () => {
      const response = await request(app)
        .post('/api/v1/vendors')
        .send(validVendorData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(validVendorData.name);
      expect(response.body.data.email).toBe(validVendorData.email);
    });

    it('should not create vendor with duplicate email', async () => {
      await VendorModel.create(validVendorData);

      const response = await request(app)
        .post('/api/v1/vendors')
        .send(validVendorData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/vendors', () => {
    beforeEach(async () => {
      await VendorModel.create([
        validVendorData,
        {
          ...validVendorData,
          name: 'Second Vendor',
          email: 'vendor2@test.com'
        }
      ]);
    });

    it('should get all vendors', async () => {
      const response = await request(app)
        .get('/api/v1/vendors');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(2);
    });
  });

  describe('PUT /api/v1/vendors/:id', () => {
    let vendorId;

    beforeEach(async () => {
      const vendor = await VendorModel.create(validVendorData);
      vendorId = vendor._id;
    });

    it('should update vendor details', async () => {
      const updateData = {
        name: 'Updated Vendor Name',
        phone: '9876543210'
      };

      const response = await request(app)
        .put(`/api/v1/vendors/${vendorId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.phone).toBe(updateData.phone);
    });
  });
});
