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


  describe("Get All Plans api",()=>{

    //Success
    it("should return status 200 if all plans are listed Succesfully", async()=>{
      const userJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA3Zjk5MGRhNGU2NWM1MzhlYzUiLCJyb2xlcyI6ZmFsc2UsImlhdCI6MTY3OTcxMTEyMCwiZXhwIjoxNjc5OTcwMzIwfQ.LTpT2RpWSerwnb6TnpCSTYes56oTaRGAIlwWOL5GIM4";

      const res = await request(app).get(`${baseRoute}/plan`).set("Cookie",`userJWT=${userJWT}`)
        expect(res.status).toBe(200)
    })

    it("should return json error:false", async()=>{
      const userJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA3Zjk5MGRhNGU2NWM1MzhlYzUiLCJyb2xlcyI6ZmFsc2UsImlhdCI6MTY3OTcxMTEyMCwiZXhwIjoxNjc5OTcwMzIwfQ.LTpT2RpWSerwnb6TnpCSTYes56oTaRGAIlwWOL5GIM4";

      const res = await request(app).get(`${baseRoute}/plan`).set("Cookie",`userJWT=${userJWT}`)
        expect(res.body.error).toBe(false)
    })

    it("should return json message:All Plans are listed Succesfully!", async()=>{
      const userJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA3Zjk5MGRhNGU2NWM1MzhlYzUiLCJyb2xlcyI6ZmFsc2UsImlhdCI6MTY3OTcxMTEyMCwiZXhwIjoxNjc5OTcwMzIwfQ.LTpT2RpWSerwnb6TnpCSTYes56oTaRGAIlwWOL5GIM4";

      const res = await request(app).get(`${baseRoute}/plan`).set("Cookie",`userJWT=${userJWT}`)
        expect(res.body.message).toBe("All Plans are listed Succesfully!")
    })
    
    it("should return json data object", async()=>{


      const userJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA3Zjk5MGRhNGU2NWM1MzhlYzUiLCJyb2xlcyI6ZmFsc2UsImlhdCI6MTY3OTcxMTEyMCwiZXhwIjoxNjc5OTcwMzIwfQ.LTpT2RpWSerwnb6TnpCSTYes56oTaRGAIlwWOL5GIM4";

      const res = await request(app).get(`${baseRoute}/plan`).set("Cookie",`userJWT=${userJWT}`)

        expect(res.body.data[0].isActive).toBe(false)
        expect(res.body.data[0].planType).toBe("premium")
        expect(res.body.data[0].price).toBe("30")
    })

    //ERRORS:

      //MIDDLEWARE ERROR
    it("should return status 403 if something is wrong with middleware",async()=>{
  
      const res = await request(app).get(`${baseRoute}/plan`)
      expect(res.status).toBe(403)
    })

    it("should return json error:true",async()=>{
      
      const res = await request(app).get(`${baseRoute}/plan`)
      expect(res.body.error).toBe(true)
    })

    it("should return json message:Invalid User admin token(req.cookies.userJWT) ",async()=>{
 
      const res = await request(app).get(`${baseRoute}/plan`)
      expect(res.body.message).toBe("Invalid Auth user token(req.cookies.userJWT) ")
    })

    //GENERAL CATCH ERROR
    it("should return status 500 if function catch an error",async()=>{
      const userJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA3Zjk5MGRhNGU2NWM1MzhlYzUiLCJyb2xlcyI6ZmFsc2UsImlhdCI6MTY3OTcxMTEyMCwiZXhwIjoxNjc5OTcwMzIwfQ.LTpT2RpWSerwnb6TnpCSTYes56oTaRGAIlwWOL5GIM4"; //set the current jwt for admin
          
      jest.spyOn(Plan, 'find').mockImplementation(() => {
        throw new Error('Server error');
      });
        const res = await request(app).get(`${baseRoute}/plan`).set("Cookie",`userJWT=${userJWT}`)

        expect(res.status).toBe(500)
        jest.spyOn(Plan, 'find').mockRestore();

    })
    it("should return status 500 if function catch an error",async()=>{
      const userJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA3Zjk5MGRhNGU2NWM1MzhlYzUiLCJyb2xlcyI6ZmFsc2UsImlhdCI6MTY3OTcxMTEyMCwiZXhwIjoxNjc5OTcwMzIwfQ.LTpT2RpWSerwnb6TnpCSTYes56oTaRGAIlwWOL5GIM4"; //set the current jwt for admin
          
      jest.spyOn(Plan, 'find').mockImplementation(() => {
        throw new Error('Server error');
      });
        const res = await request(app).get(`${baseRoute}/plan`).set("Cookie",`userJWT=${userJWT}`)

        expect(res.body.error).toBe(true)
        jest.spyOn(Plan, 'find').mockRestore();

    })
    it("should catch and error if something is wrong",async()=>{
      const userJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFiYjA3Zjk5MGRhNGU2NWM1MzhlYzUiLCJyb2xlcyI6ZmFsc2UsImlhdCI6MTY3OTcxMTEyMCwiZXhwIjoxNjc5OTcwMzIwfQ.LTpT2RpWSerwnb6TnpCSTYes56oTaRGAIlwWOL5GIM4"; //set the current jwt for admin
          
        const res = await request(app).get(`${baseRoute}/plan`).set("Cookie",`userJWT=${userJWT}`)

        expect(res.body.message).toBeDefined();

    })

  })