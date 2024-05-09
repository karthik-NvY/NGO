const request = require('supertest')
describe('storing Request', () => {
    let newloginres
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        newloginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
        token = newloginres.body.token
    });
    test('Return error if ngo_id or user_id is missing', async () => {
          
        const packet = {token : newloginres.body.token};
        const res = await request("http://localhost:8080").post('/api/add').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test("Return if user's request is successfully added", async () => {
         
        const packet = {token :newloginres.body.token,ngo_id:"662d56beb2b7e67ff188510c",  user_id:"6604383836a52af8f67ecc10"};
        const res = await request("http://localhost:8080").post('/api/add').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('successfully request added');
    });
}

)
describe('Fetching Request', () => {

    let newloginres
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        newloginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
        token = newloginres.body.token
    });
    test('Return error if ngo_id is missing', async () => {
       
        const packet = {token: newloginres.body.token};
        const res = await request("http://localhost:8080").post('/api/fetch').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return if no ngo_id is found in request list', async () => {

        const packet = {token : newloginres.body.token,ngo_id:"662d56beb2b7e67ff188518c"};
        const res = await request("http://localhost:8080").post('/api/fetch').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('No user requested from this ngo');
    });

    test('Return if users are successfully fetched ', async () => {

        const packet = {token : newloginres.body.token,ngo_id:"662d56beb2b7e67ff188510c"};
        const res = await request("http://localhost:8080").post('/api/fetch').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Requests fetched successfully');
    });
}
)


describe('deleteing Request', () => {
    let newloginres
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        newloginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
        token = newloginres.body.token
    });
    test('Return error if token not set properly', async () => {
          
        const packet = {token : newloginres.body.token};
        const res = await request("http://localhost:8080").post('/api/delete').send(packet)
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Autherization failed due to absence of token');
    });

    test('Return if no ngo_id is found in request list', async () => {
          
        const packet = {token : newloginres.body.token, ngo_id :"662d56beb2b7e67ff188518c"};
        const res = await request("http://localhost:8080").post('/api/delete').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No Request found with the provided ID');
    });

    test('Return if request is successfully deleted ', async () => {
         
        const packet = {token : newloginres.body.token, ngo_id:"662d56beb2b7e67ff188510c"};
        const res = await request("http://localhost:8080").post('/api/delete').send(packet).set('Authorization', `Bearer ${token}`)
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
        token = newloginres.body.token
    });
    test('Return error if token not set properly', async () => {
          
        const packet = {token : newloginres.body.token};
        const res = await request("http://localhost:8080").post('/api/updateRole').send(packet)
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Autherization failed due to absence of token');
    });

    test('No user was found with that id', async () => {
         
        const packet = {token : newloginres.body.token,user_id:"6604383836a52af8f67ecc11",ngo_id:"662d56beb2b7e67ff188510c"};
        const res = await request("http://localhost:8080").post('/api/updateRole').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No user found with that id');
    });

    test(' Role updated successfully ', async () => {
        const packet1 = {
            ngo_id: '662d56beb2b7e67ff188510c',
            role : "volunteer",            };
        const res1 = await request("http://localhost:8080").post('/roles/signupRole').send(packet1).set('Authorization', `Bearer ${token}`)
        const packet = {token : newloginres.body.token,ngo_id:"662d56beb2b7e67ff188510c"};
        const res = await request("http://localhost:8080").post('/api/updateRole').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('role updated successfully');
        const packet2 = {
            ngo_id: '662d56beb2b7e67ff188510c',
            role : "volunteer",            };
        const res2 = await request("http://localhost:8080").post('/roles/deleteRole').send(packet2).set('Authorization', `Bearer ${token}`)
    });
}
)   