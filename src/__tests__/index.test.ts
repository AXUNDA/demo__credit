import server from "../index"

import db from "../db/database"
import supertest from "supertest"











const request = supertest




var token = null



describe("app unit tests",()=>{
  beforeAll(async()=>{
    await db.transaction(async(trx)=>{
      await trx.delete("*").from("transaction_history")
      await trx.delete("*").from("wallet")


      await trx.delete("*").from("users")

    })
   


  })
   

    afterAll(async()=>{
      await db.transaction(async(trx)=>{
        await trx.delete("*").from("transaction_history")
        await trx.delete("*").from("wallet")


        await trx.delete("*").from("users")
  
      })
      server.close()
    })
   
    
    it("should signup",async ()=>{
     const res =   await request(server).post("/auth")
        .send({
          email: "exapmle1@example.com",
          password: '123456789',
       
        })
         expect(res.statusCode).toEqual(201) 
         token = res.body.token
        
       
      

      })
      it("should return a status of 409*conflict* because a user with this email already exists",async ()=>{
        const res =   await request(server).post("/auth")
           .send({
             email: "exapmle1@example.com",
             password: '123456789',
          
           })
            expect(res.statusCode).toEqual(409) 
           
           
          
         
   
         })
      it("should return a status of 400 because a valid email was not passed",async ()=>{
        const res =   await request(server).post("/auth")
           .send({
             email: "exapmle1",
             password: '123456789',
          
           })
            expect(res.statusCode).toEqual(400) 
         })
         it("should return a status of 400 because password is less than 6 digits long ",async ()=>{
            const res =   await request(server).post("/auth")
               .send({
                 email: "exapmle3@mail.com",
                 password: '1234',
              
               })
                expect(res.statusCode).toEqual(400) 
              
               
              
             
       
             })
      it("should signup and create a second user",async ()=>{
        const res =   await request(server).post("/auth")
           .send({
             email: "exapmle2@example.com",
             password: '123456789',
          
           })
            expect(res.statusCode).toEqual(201) 
     

           
          
         
   
         })
      it("should login",async ()=>{
        const res =   await request(server).post("/auth/signin")
        .send({
          email: "exapmle1@example.com",
          password: '123456789',
       
        })
         expect(res.statusCode).toEqual(200) 
       
       

      })
      it("should fail to login because false email was passed",async ()=>{
        const res =   await request(server).post("/auth/signin")
        .send({
          email: "falsemail@example.com",
          password: '123456789',
       
        })
         expect(res.statusCode).toEqual(404) 
       
       

      })
      it("should top up users wallet",async ()=>{
        const res =   await request(server).post("/wallet/deposit") .set('Authorization', 'Bearer ' + token)
        .send({
         amount:50
       
        })
         expect(res.statusCode).toEqual(200) 
       
       

      })
      it("should return a status of 401 because no auth token was provided",async ()=>{
        const res =   await request(server).post("/wallet/deposit") 
        .send({
         amount:50
       
        })
         expect(res.statusCode).toEqual(401) 
       
       

      })
      it("should withdraw funds from a  users wallet",async ()=>{
        const res =   await request(server).post("/wallet/withdraw") .set('Authorization', 'Bearer ' + token)
        .send({
         amount:10
       
        })
         expect(res.statusCode).toEqual(200) 
       
       

      })
      it("should return a status of 400 because a user is trying to withdraw more funds than what is in their wallet",async ()=>{
        const res =   await request(server).post("/wallet/withdraw") .set('Authorization', 'Bearer ' + token)
        .send({
         amount:70
       
        })
         expect(res.statusCode).toEqual(400) 
       
       

      })
      it("should  transfer funds to user 2",async ()=>{
        const res =   await request(server).post("/wallet/transfer") .set('Authorization', 'Bearer ' + token)
        .send({
            email: "exapmle2@example.com",
         amount:10
       
        })
         expect(res.statusCode).toEqual(200) 
       
       

      })
      it("should ret0rn a status of 409 because a user is trying to transfer funds to themselves",async ()=>{
        const res =   await request(server).post("/wallet/transfer") .set('Authorization', 'Bearer ' + token)
        .send({
            email: "exapmle1@example.com",
         amount:10
       
        })
         expect(res.statusCode).toEqual(400) 
       
    
      })

})







