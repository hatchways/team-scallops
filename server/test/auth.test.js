require("dotenv").config();

require("../models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.js");
const User = require("../models/User");

const newUser = {
  username: "testuser",
  password: "testpassword",
  email: "test@gmail.com",
};

chai.should();
chai.use(chaiHttp);

describe("Test for all auth endpoints", () => {
  describe("POST /auth/register: Test for new user registeration", () => {
    it("register should return 201 code, cookie token and logged in user", (pass) => {
      chai
        .request(app)
        .post("/auth/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.have.cookie("token");
          res.body.should.have.property("success");
          res.body.success.should.have.property("user");
          pass();
        });
    });

    it("register should return 409 code when user already exists", (pass) => {
      chai
        .request(app)
        .post("/auth/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.property("error");
          pass();
        });
    });
  });

  describe("Test for Login session", () => {
    const agent = chai.request.agent(app);

    describe("/POST login", () => {
      it("login should return 200 code, cookie token and logged in user", (pass) => {
        agent
          .post("/auth/login")
          .send(newUser)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.have.cookie("token");
            res.body.should.have.property("success");
            res.body.success.should.have.property("user");
            pass();
          });
      });
    });

    describe("/GET user", () => {
      it("user should return 200 code and logged in user", (pass) => {
        agent.get("/auth/user").end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success");
          res.body.success.should.have.property("user");
          pass();
        });
      });
    });

    describe("/POST logout", () => {
      it("logout should clear cookie and text message", async () => {
        const res = await agent.post(`/auth/logout`);
        res.text.should.include("You have successfully logged out");
        agent.should.not.have.cookie("token");
      });
    });
  });

  // Delete the test user from database
  after(async () => {
    await User.deleteOne({ email: newUser.email });
  });
});
