import { app } from "../index.js";
import supertest from "supertest";
const request = supertest;



//The integration tests will only run on a seeded table from seeds/products.sql
describe('Product API', () => {
    // Test for getting a single product
    describe('GET /api/v1/products/:id', () => {
        it('should return a single product and increment view count', async () => {
            let response = await request(app).get('/api/v1/products/1?currency=USD');
            expect(response.status).toBe(200);
            expect(response.body.error).toBeNull()
            expect(response.body.result).toHaveProperty('id', 1);

            //requesting again should increment the view count
            const curr = response.body.result.productViewed;
            response = await request(app).get('/api/v1/products/1?currency=USD');
            expect(response.body.result.productViewed).toBe(curr+1);
        });

        it('should return 404 for a non-existent product', async () => {
            const response = await request(app).get('/api/v1/products/9999');
            expect(response.status).toBe(404);
        });
    });

    // Test for listing most viewed products
    describe('GET /api/v1/products/most-viewed', () => {
        it('should return the top 5 most viewed products', async () => {
            const response = await request(app).get('/api/v1/products/most-viewed');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.result)).toBe(true);
            expect(response.body.result.length).toBeLessThanOrEqual(5); 
        });

        it('should return the specified number of most viewed products', async () => {
            const response = await request(app).get('/api/v1/products/most-viewed?limit=1');
            expect(response.status).toBe(200);
            expect(response.body.result.length).toBe(1);
        });
    });
});