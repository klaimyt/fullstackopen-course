const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./blog_helper");

const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there is initially some blogs saved", () => {

  test("all notes are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe('viewing a specific blog', () => {
  test("has id parameter", async () => {
    const response = await api.get("/api/blogs");

    const ids = response.body.map(r => r.id)
  
    expect(ids).toHaveLength(helper.initialBlogs.length);
  });
})

describe("Addition of new blog", () => {
  test("Succeeds with correct data", async () => {
    await api.post("/api/blogs").send({ title: "test", author: "a", url: "a", likes: 5 }).expect(201);
  
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("Succeeds with empty likes", async () => {
    const request = await api.post("/api/blogs").send({ title: "test", author: "a", url: "a" }).expect(201);
  
    const response = await api.get("/api/blogs/" + request.body.id);
  
    expect(response.body.likes).toBe(0);
  });

  test("Without title and author", async () => {
    await api.post("/api/blogs").send({ likes: 0, url: "test.com" }).expect(400);
  });
})

afterAll(() => {
  mongoose.connection.close();
});
