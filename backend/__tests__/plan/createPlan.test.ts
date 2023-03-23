import request from "supertest"
import app from "../../lib/app"
import mongoose,{ ConnectOptions } from "mongoose"
import Plan from "../../lib/models/Plan"
import config from "config"

const baseRoute = "/api/v1"


beforeAll(async () => {
    const url =config.get<string>("MONGO_TEST_URL")
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true} as ConnectOptions);
  });
  // Cleans up database between each test
  afterEach(async () => {
    await Plan.deleteMany();
  });

  describe("Create Plan api",()=>{

    //Success
    it("should return status 201 if plan is created Succesfully",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":"30"
        }
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin
        
        
        const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`).send(data)
        expect(res.status).toBe(201)
    })

    it("should return json error:false",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":"30"
        }
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin
        
        
        const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`).send(data)
        expect(res.body.error).toBe(false)
    })

    it("should return json message:Membership Plan Created Succesfully!",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":"30"
        }
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin
        
        
        const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`).send(data)
        expect(res.body.message).toBe("Membership Plan Created Succesfully!")
    })
    it("should return json data object",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":"30"
        }
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin
        
        
        const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`).send(data)
        expect(res.body.data.planType).toBe("premium");
        expect(res.body.data.price).toBe("30");
        expect(res.body.data.isActive).toBe(false);
    })

    //ERRORS:

    //MIDDLEWARE ERROR
    it("should return status 403 if something is wrong with middleware",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":"30"
        }
        
        const res = await request(app).post(`${baseRoute}/plan`).send(data)
        expect(res.status).toBe(403)
    })

    it("should return json error:true",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":"30"
        }
        
        const res = await request(app).post(`${baseRoute}/plan`).send(data)
        expect(res.body.error).toBe(true)
    })

    it("should return json message:Invalid Auth admin token(req.cookies.adminJWT) ",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":"30"
        }
        
        const res = await request(app).post(`${baseRoute}/plan`).send(data)
        expect(res.body.message).toBe("Invalid Auth admin token(req.cookies.adminJWT) ")
    })

    //GENERAL CATCH ERROR
    // it("should return status 500 if function catch an error",async()=>{
    //     const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin

    //     process.env.NODE_ENV = undefined;
             
    //     const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`)

    //     expect(res.status).toBe(500)
    // })
    it("should catch and error if something is wrong",async()=>{
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin
             
        const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`)
        expect(res.body.message).toBeDefined();
    })

    it("should return json error:true",async()=>{
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin
             
        const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`)
        expect(res.body.error).toBe(true)
    })

    //ZOD VALIDATION ERROR
    it("should return status 422 if zod validation is not correct ",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":30
        }
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin
        
        const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`).send(data)
        expect(res.status).toBe(422)
    })
    it("should return json error:true ",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":30
        }
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin
        
        const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`).send(data)
        expect(res.body.error).toBe(true)
    })
    it("should return json message:Validation failed ",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":30
        }
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin
        
        const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`).send(data)
        expect(res.body.message).toBe("Validation failed")
    })
    it("should return data array object with formattedErrors",async()=>{
        //mock data
        const data = {
            "isActive":false,
            "planType":"premium",
            "price":30 //in that case, price field is wrong. must be a string not a number
        }
        const adminJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA5ODk5MGRhNGU2NWM1MzhlYzgiLCJyb2xlcyI6dHJ1ZSwiaWF0IjoxNjc5NTQwNTgwLCJleHAiOjE2Nzk3OTk3ODB9.khZ6nNDlzkTdznH8Vzc4BdTydmKXP7NQMf6QOhWZCZg" //set the current jwt for admin
        
        const res = await request(app).post(`${baseRoute}/plan`).set("Cookie",`adminJWT=${adminJWT}`).send(data)
        expect(res.body.data[0].field).toBe("price")
        expect(res.body.data[0].message).toBe("price must be a string")
    })
  })