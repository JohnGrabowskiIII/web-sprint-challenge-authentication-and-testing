// Write your tests here

const db = require("../data/dbConfig.js")
const request = require("supertest")
const server = require("./server")

const testUser = {
  username: "testUser",
  password: "testPassword"
}

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

    it("Post responds with correct status code", async () => {
      let response = await request(server).post("/api/auth/register").send(testUser)
      expect(response.statusCode).toEqual(201)
    })

    it("Posts new user to databse through register endpoint", async () => {
      let response = await request(server).post("/api/auth/register").send(testUser)
      expect(response.body.username).toMatch("testUser")
    })

    it("Rejects user with pre-existing name", async () => {
      let responseOne = await request(server).post("/api/auth/register").send(testUser)
      let responseTwo = await request(server).post("/api/auth/register").send(testUser)
      expect(responseTwo.statusCode).toEqual(401)
    })

  })

  describe("Post to login endpoint", () => {

    it("Post responds with correct status code", async () => {
      let register = await request(server).post("/api/auth/register").send(testUser)
      let response = await request(server).post("/api/auth/login").send(testUser)
      expect(response.statusCode).toEqual(200)
    })

    it("Recieves token on successful login", async () => {
      let register = await request(server).post("/api/auth/register").send(testUser)
      let response = await request(server).post("/api/auth/login").send(testUser)
      expect(response.body.token).toBeTruthy()
    })

    it("Rejects login if invalid credentials", async () => {
      let register = await request(server).post("/api/auth/register").send(testUser)
      let response = await request(server).post("/api/auth/login").send({...testUser, password: "notthepassword"})
      expect(response.statusCode).toEqual(401)
    })

  })

  describe("Jokes endpoint responds correctly", () => {

    it("Get is rejected if no token", async () => {
      let response = await request(server).get("/api/jokes")
      expect(response.statusCode).toEqual(401)
    })

    it("Get is accepted with token", async () => {
      let register = await request(server).post("/api/auth/register").send(testUser)
      let login = await request(server).post("/api/auth/login").send(testUser)
      let response = await request(server).get("/api/jokes").set("Authorization", login.body.token)
      expect(response.statusCode).toEqual(200)
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