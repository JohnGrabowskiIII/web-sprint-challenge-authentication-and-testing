// Write your tests here

const db = require("../data/dbConfig.js")
const request = require("supertest")
const server = require("./server")

test('sanity', () => {
  expect(true).toBe(true)
})
