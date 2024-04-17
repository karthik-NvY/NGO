const request = require('supertest')
describe('Fetching Request', () => {

    let newloginres
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        newloginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
    });
    test('Return error if ngo_id is missing', async () => {
       
        const packet = {token: newloginres.body.token};
        const res = await request("http://localhost:8080").post('/api/fetch').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return if no ngo_id is found in request list', async () => {

        const packet = {token : newloginres.body.token,ngo_id:"GAK986"};
        const res = await request("http://localhost:8080").post('/api/fetch').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('No user requested from this ngo');
    });

    test('Return if user is successfully fetched ', async () => {

        const packet = {token : newloginres.body.token,ngo_id:"GAK987"};
        const res = await request("http://localhost:8080").post('/api/fetch').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Requests fetched successfully');
    });
}
)
describe('storing Request', () => {
    let newloginres
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        newloginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
    });
    test('Return error if ngo_id or user_id is missing', async () => {
          
        const packet = {token : newloginres.body.token};
        const res = await request("http://localhost:8080").post('/api/add').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test("Return if user's request is successfully added", async () => {
         
        const packet = {token :newloginres.body.token,ngo_id:"GAK987",  user_id:"6604383836a52af8f67ecc10"};
        const res = await request("http://localhost:8080").post('/api/add').send(packet)
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('successfully request added');
    });
}

)

describe('deleteing Request', () => {
    let newloginres
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        newloginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
    });
    test('Return error if user_id is missing', async () => {
          
        const packet = {token : newloginres.body.token};
        const res = await request("http://localhost:8080").post('/api/delete').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return if no ngo_id is found in request list', async () => {
          
        const packet = {token : newloginres.body.token,user_id:"6604383836a52af8f67ecc11"};
        const res = await request("http://localhost:8080").post('/api/delete').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No Request found with the provided ID');
    });

    test('Return if user is successfully fetched ', async () => {
         
        const packet = {token : newloginres.body.token,user_id:"6604383836a52af8f67ecc10"};
        const res = await request("http://localhost:8080").post('/api/delete').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Request deleted successfully');
    });
}
)
describe('updating Role', () => {
    let newloginres
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        newloginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
    });
    test('Return error if user_id is missing', async () => {
          
        const packet = {token : newloginres.body.token};
        const res = await request("http://localhost:8080").post('/api/updateRole').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('No user was found with that id', async () => {
         
        const packet = {token : newloginres.body.token,user_id:"6604383836a52af8f67ecc11",ngo_id:"GHP562"};
        const res = await request("http://localhost:8080").post('/api/updateRole').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No user found with that id');
    });

    test(' Role updated successfully ', async () => {
          
        const packet = {token : newloginres.body.token,user_id:"KLTSF533649",ngo_id:"GAK987"};
        const res = await request("http://localhost:8080").post('/api/updateRole').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('role updated successfully');
    });
}
)   