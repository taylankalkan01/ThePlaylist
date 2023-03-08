import request from 'supertest';
import app from '../lib/app';

  describe('app healthcheck', () => {
    it('should return status code 200',async () => {
        const res = await request(app).get("/healthcheck");
        expect(res.status).toBe(200);
    });
    it('should return healthcheck message',async () => {
       const res =  await request(app).get("/healthcheck")    
        expect(res.text).toBe("\"healthcheck\"");
    });

  });