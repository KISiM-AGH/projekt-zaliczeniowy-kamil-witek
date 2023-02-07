process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();
const { Doctor } = require("../models");

chai.use(chaiHttp);

it("get all doctors", () => {
  chai
    .request(app)
    .get("/doctors")
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property("items");
      res.body.items.should.have.property("count");
      res.body.items.should.have.property("rows");
    });
});

it("add doctors", () => {
  const doctor = {
    numberPwz: "1111112",
    firstname: "Janusz",
    lastname: "Tracz",
    specialization: "onkolog"
  };
  Doctor.destroy({
    where: {
      numberPwz: "1111112"
    }
  });

  chai
    .request(app)
    .post("/doctor/add")
    .send(doctor)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.item.numberPwz.should.equals(doctor.numberPwz);
      res.body.item.firstname.should.equals(doctor.firstname);
      res.body.item.lastname.should.equals(doctor.lastname);
      res.body.item.specialization.should.equals(doctor.specialization);
    });
});

it("edit doctor",  () => {
  let doctor = {
    numberPwz: "1111112",
    firstname: "Janusz",
    lastname: "Tracz",
    specialization: "onkolog"
  };

  Doctor.destroy({
    where: {
      numberPwz: "1111112"
    }
  });

  const item = Doctor.create(doctor);

  doctor.id = item.id;
  
  doctor.firstname = "Zbigniew";

  doctor.lastname = "Stonoga";

  chai
    .request(app)
    .post("/doctor/edit")
    .send(doctor)
    .end((err, res) => {
      res.should.have.status(200);      
      console.log(res.body);
    });
});
