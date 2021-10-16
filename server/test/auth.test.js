require("dotenv").config();

const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/GET logout", () => {
  it("logout should return 200 code and message", (pass) => {
    chai
      .request(app)
      .get(`/auth/logout`)
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.include("You have successfully logged out");
        pass();
      });
  });
});
