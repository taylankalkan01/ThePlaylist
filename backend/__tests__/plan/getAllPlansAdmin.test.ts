import request from "supertest"
import app from "../../lib/app"
import mongoose,{ ConnectOptions } from "mongoose"
import Plan from "../../lib/models/Plan"
import config from "config"

const baseRoute = "/api/v1/plan/admin"

beforeAll(async () => {
    const url =config.get<string>("MONGO_TEST_URL")
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true} as ConnectOptions);
    
   await Plan.create({
            "isActive":false,
            "planType":"premium",
            "price":"30"
        })    
  });
  // Cleans up database between each test
afterAll(async () => {
    await Plan.deleteMany();
  });


  describe("Get All Plans for admin api",()=>{

    //Success
    it("should return status 200 if all plans are listed Succesfully", async()=>{
      const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjgwMDUwOTQ1LCJleHAiOjE2ODAzMTAxNDV9.202kuZVNu8p1rA2dmWmiX9-V_4jAgVZGuK426ktZMj4";

      const res = await request(app).get(`${baseRoute}`).set("Cookie",`adminJWT=${adminJWT}`)
        expect(res.status).toBe(200)
    })

    it("should return json error:false", async()=>{
      const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjgwMDUwOTQ1LCJleHAiOjE2ODAzMTAxNDV9.202kuZVNu8p1rA2dmWmiX9-V_4jAgVZGuK426ktZMj4";

      const res = await request(app).get(`${baseRoute}`).set("Cookie",`adminJWT=${adminJWT}`)
        expect(res.body.error).toBe(false)
    })

    it("should return json message:All Plans are listed for admin Succesfully!", async()=>{
      const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjgwMDUwOTQ1LCJleHAiOjE2ODAzMTAxNDV9.202kuZVNu8p1rA2dmWmiX9-V_4jAgVZGuK426ktZMj4";

      const res = await request(app).get(`${baseRoute}`).set("Cookie",`adminJWT=${adminJWT}`)
        expect(res.body.message).toBe("All Plans are listed for admin Succesfully!")
    })
    
    it("should return json data object", async()=>{
      const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjgwMDUwOTQ1LCJleHAiOjE2ODAzMTAxNDV9.202kuZVNu8p1rA2dmWmiX9-V_4jAgVZGuK426ktZMj4";

      const res = await request(app).get(`${baseRoute}`).set("Cookie",`adminJWT=${adminJWT}`)

        expect(res.body.data[0].isActive).toBe(false)
        expect(res.body.data[0].planType).toBe("premium")
        expect(res.body.data[0].price).toBe("30")
    })

    //ERRORS:

      //MIDDLEWARE ERROR
    it("should return status 403 if something is wrong with middleware",async()=>{
  
      const res = await request(app).get(`${baseRoute}`)
      expect(res.status).toBe(403)
    })

    it("should return json error:true",async()=>{
      
      const res = await request(app).get(`${baseRoute}`)
      expect(res.body.error).toBe(true)
    })

    it("should return json message:Invalid User admin token(req.cookies.adminJWT) ",async()=>{
 
      const res = await request(app).get(`${baseRoute}`)
      expect(res.body.message).toBe("Invalid Auth admin token(req.cookies.adminJWT) ")
    })

    //GENERAL CATCH ERROR
    it("should return status 500 if function catch an error",async()=>{
      const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjgwMDUwOTQ1LCJleHAiOjE2ODAzMTAxNDV9.202kuZVNu8p1rA2dmWmiX9-V_4jAgVZGuK426ktZMj4"; //set the current jwt for admin
          
      jest.spyOn(Plan, 'find').mockImplementation(() => {
        throw new Error('Server error');
      });
        const res = await request(app).get(`${baseRoute}`).set("Cookie",`adminJWT=${adminJWT}`)

        expect(res.status).toBe(500)
        jest.spyOn(Plan, 'find').mockRestore();

    })
    it("should return status 500 if function catch an error",async()=>{
      const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjgwMDUwOTQ1LCJleHAiOjE2ODAzMTAxNDV9.202kuZVNu8p1rA2dmWmiX9-V_4jAgVZGuK426ktZMj4"; //set the current jwt for admin
          
      jest.spyOn(Plan, 'find').mockImplementation(() => {
        throw new Error('Server error');
      });
        const res = await request(app).get(`${baseRoute}`).set("Cookie",`adminJWT=${adminJWT}`)

        expect(res.body.error).toBe(true)
        jest.spyOn(Plan, 'find').mockRestore();

    })
    it("should catch and error if something is wrong",async()=>{
      const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjgwMDUwOTQ1LCJleHAiOjE2ODAzMTAxNDV9.202kuZVNu8p1rA2dmWmiX9-V_4jAgVZGuK426ktZMj4"; //set the current jwt for admin
          
        const res = await request(app).get(`${baseRoute}`).set("Cookie",`adminJWT=${adminJWT}`)

        expect(res.body.message).toBeDefined();

    })

  })