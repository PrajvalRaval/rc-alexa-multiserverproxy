"use strict";
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

describe("POST /register", () => {
	let memo;
	describe("post", () => {
		it("should register and get unique number", done => {
			chai
				.request("localhost:8080")
				.post("/register")
				.send({server_url: "https://open.rocket.chat", server_name: "open",  userid: "sing.li", token: "8373203axde"})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(201);
					memo = res.body;
					done();
				});
		});
	});
});

describe("GET /user/data", () => {
	it("should get correct data from number", done => {
		chai
			.request("localhost:8080")
			.get(`/user/data/${testuser._id}`)
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});
	it("should fail with bogus number", done => {
		chai
			.request("localhost:8080")
			.get("/user/data/000")
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res.body).to.be.an("array");
				done();
			});
	});
});

