// Write your tests here

const db = require("../data/dbConfig.js")
const request = require("supertest")
const server = require("./server")

// MIGRATE DOWN AND THEN UP
beforeAll(async ()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

// TRUNCATE DB
beforeEach(async ()=>{
  await db("users").truncate()
})

// DESTROY DB
afterAll(async ()=>{
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe("Test Endpoints", () => {

  describe("Post to register endpoint", () => {

    it("Post responds with correct status code", () => {

    })

    it("Posts new user to databse through register endpoint", () => {

    })

    it("Rejects user with pre-existing name", () => {

    })

  })

  describe("Post to login endpoint", () => {

    it("Post responds with correct status code", () => {

    })

    it("Recieves token on successful login", () => {

    })

    it("Rejects login if invalid credentials", () => {
      
    })

  })

})

// DESCRIBE
//    DESCRIBE
//    POST TO REGISTER ENDPOINT
//      IT
//      ADDS NEW USER TO DB
//      IT
//      REJECTS IF NOT NAME IS TAKEN
//    DESCRIBE
//    POST TO LOGIN ENDPOINT
//      IT
//      RECIEVES TOKEN ON SUCCESSFUL LOGIN
//      IT
//      REJECTS IF LOGIN IS INVALID