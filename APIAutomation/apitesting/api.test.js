import fetch from "node-fetch"
import { expect } from "chai";
import Ajv from "ajv";
import schema_getngambildatauser from "../schema/get.schema.js";
import schema_postbikinuserbaru from "../schema/post.schema.js";
import schema_putupdatedatauser from "../schema/put.schema.js";

describe("API Test Suite", function () {
    const baseURL = `https://reqres.in`;

    it("GET Single User", async function () {
        
        const startTime = Date.now();
        
        const responseGet = await fetch(`${baseURL}/api/users/2`);
        
        const endTime = Date.now();
        const responseTimeGet = endTime - startTime;
        console.log(`Response Time: ${responseTimeGet}ms`);

        
        expect(responseGet.status, "ada yang salah dari method GET").to.equal(200)

        
        expect(responseTimeGet, "Response time lebih dari 500ms").to.be.lessThan(500);

        
        const dataGet = await responseGet.json();
        
        expect(dataGet.data.id, "User ID tidak sesuai").to.equal(2);

        
        const ajvGet = new Ajv()
        
        const cekcekGet = ajvGet.compile(schema_getngambildatauser)
        const hasil_schemaGet = cekcekGet(dataGet)
        expect(hasil_schemaGet, `schema is not valid from method GET`).to.be.true
    });

    it("POST Create User", async function () {
        
        const startTime = Date.now();
        
        const newPost = {
            "name": "morpheus",
            "job": "leader"
        }
        const responsePost = await fetch(`${baseURL}/api/users`, {
            method: "POST",
            headers: {
                "x-api-key": "reqres-free-v1",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        })
        
        const endTime = Date.now();
        const responseTimePost = endTime - startTime;
        console.log(`Response Time: ${responseTimePost}ms`);

        
        
        expect(responsePost.status, "Status code tidak sesuai").to.be.oneOf([201, 202]);

        
        expect(responseTimePost, "Response time lebih dari 500ms").to.be.lessThan(500);

        
        const dataPost = await responsePost.json();
        
        expect(dataPost.job, "Job tidak sesuai").to.equal("leader");

        
        const ajvPost = new Ajv()
        
        const cekcekPost = ajvPost.compile(schema_postbikinuserbaru)
        const hasil_schemaPost = cekcekPost(dataPost)
        expect(hasil_schemaPost, `schema is not valid from method Post`).to.be.true
    });

    it("PUT Update Info User", async function () {
    
        const startTime = Date.now();
        
        const newPut = {
            "name": "morpheus",
            "job": "zion resident"
        }
        const responsePut = await fetch(`${baseURL}/api/users/2`, {
            method: "PUT",
            headers: {
                "x-api-key": "reqres-free-v1",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPut)
        })
        
        const endTime = Date.now();
        const responseTimePut = endTime - startTime;
        console.log(`Response Time: ${responseTimePut}ms`);

        
        expect(responsePut.status, "ada yang salah nih dari method Put").to.equal(200)

        
        expect(responseTimePut, "Response time lebih dari 500ms").to.be.lessThan(500);

        
        const dataPut = await responsePut.json();
        
        expect(dataPut.job, "Job tidak sesuai").to.equal("zion resident");

        
        const ajvPut = new Ajv()
        
        const cekcekPut = ajvPut.compile(schema_putupdatedatauser)
        const hasil_schemaPut = cekcekPut(dataPut)
        expect(hasil_schemaPut, `schema is not valid from method PUT`).to.be.true
    })

    it("DELETE Delete Info User", async function () {
        
        const startTime = Date.now();
        
        const responseDelete = await fetch(`${baseURL}/api/users/2`, {
            method: "DELETE",
            headers: {
                "x-api-key": "reqres-free-v1",
                "Content-Type": "application/json"
            },
        })
        
        const endTime = Date.now();
        const responseTimeDelete = endTime - startTime;
        console.log(`Response Time: ${responseTimeDelete}ms`);

        
        expect(responseDelete.status, "ada yang salah nih dari method DELETE").to.equal(204)

        
        expect(responseTimeDelete, "Response time lebih dari 500ms").to.be.lessThan(500);
    })
});