const request = require('supertest')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGF2aXRocmFuIiwiZW1haWwiOiIyMDIxY3NiMTA4OEBpaXRycHIuYWMuaW4iLCJpZCI6IjY2MDQzODM4MzZhNTJhZjhmNjdlY2MxMCIsImlhdCI6MTcxMzI2Njk2MCwiZXhwIjoxNzEzMzUzMzYwfQ.PlEHLKgoMY8bkaGUAXKEUSGnaithazu-P7TKPVmagQg"
describe('Fetching Request', () => {

    test('Return error if ngo_id is missing', async () => {
        const packet = {token : token};
        const res = await request("http://localhost:8080").post('/Request/fetch').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return if no ngo_id is found in request list', async () => {
        const packet = {token : token,ngo_id:"GAK986"};
        const res = await request("http://localhost:8080").post('/Request/fetch').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No user requested from this ngo');
    });

    test('Return if user is successfully fetched ', async () => {
        const packet = {token : token,ngo_id:"GAK987"};
        const res = await request("http://localhost:8080").post('/Request/fetch').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Requests fetched successfully');
    });
}
)
describe('storing Request', () => {

    test('Return error if ngo_id or user_id is missing', async () => {
        const packet = {token : token};
        const res = await request("http://localhost:8080").post('/Request/add').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test("Return if user's request is successfully added", async () => {
        const packet = {token : token,ngo_id:"GAK987",  user_id:"6604383836a52af8f67ecc10"};
        const res = await request("http://localhost:8080").post('/Request/add').send(packet)
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('successfully request added');
    });
}

)

describe('deleteing Request', () => {

    test('Return error if user_id is missing', async () => {
        const packet = {token : token};
        const res = await request("http://localhost:8080").post('/Request/delete').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return if no ngo_id is found in request list', async () => {
        const packet = {token : token,user_id:"6604383836a52af8f67ecc11"};
        const res = await request("http://localhost:8080").post('/Request/delete').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No Request found with the provided ID');
    });

    test('Return if user is successfully fetched ', async () => {
        const packet = {token : token,user_id:"6604383836a52af8f67ecc10"};
        const res = await request("http://localhost:8080").post('/Request/delete').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Request deleted successfully');
    });
}
)
describe('updating Role', () => {

    test('Return error if user_id is missing', async () => {
        const packet = {token : token};
        const res = await request("http://localhost:8080").post('/Request/updateRole').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return if no ngo_id is found in request list', async () => {
        const packet = {token : token,user_id:"6604383836a52af8f67ecc11"};
        const res = await request("http://localhost:8080").post('/Request/updateRole').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No user found with that id');
    });

    test('Return if user is successfully fetched ', async () => {
        const packet = {token : token,user_id:"DEDVE001009"};
        const res = await request("http://localhost:8080").post('/Request/updateRole').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('role updated successfully');
    });
}
)   