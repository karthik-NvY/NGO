const request = require('supertest')
describe('Fetching Request', () => {

    test('Return error if ngo_id is missing', async () => {
         // signup with new user to get token.
        const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
        const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)

        // login with new user to get token.
        const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const packet = {token: newloginres.body.token};
        const res = await request("http://localhost:8080").post('/Request/fetch').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return if no ngo_id is found in request list', async () => {
         // signup with new user to get token.
        const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
        const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)

        // login with new user to get token.
        const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)

        const packet = {token : newloginres.body.token,ngo_id:"GAK986"};
        const res = await request("http://localhost:8080").post('/Request/fetch').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No user requested from this ngo');
    });

    test('Return if user is successfully fetched ', async () => {
         // signup with new user to get token.
         const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
         const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
 
         // login with new user to get token.
         const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)

        const packet = {token : newloginres.body.token,ngo_id:"GAK987"};
        const res = await request("http://localhost:8080").post('/Request/fetch').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Requests fetched successfully');
    });
}
)
describe('storing Request', () => {

    test('Return error if ngo_id or user_id is missing', async () => {
          // signup with new user to get token.
          const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
          const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
  
          // login with new user to get token.
          const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const packet = {token : newloginres.body.token};
        const res = await request("http://localhost:8080").post('/Request/add').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test("Return if user's request is successfully added", async () => {
          // signup with new user to get token.
          const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
          const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
  
          // login with new user to get token.
          const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const packet = {token :newloginres.body.token,ngo_id:"GAK987",  user_id:"6604383836a52af8f67ecc10"};
        const res = await request("http://localhost:8080").post('/Request/add').send(packet)
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('successfully request added');
    });
}

)

describe('deleteing Request', () => {

    test('Return error if user_id is missing', async () => {
          // signup with new user to get token.
          const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
          const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
  
          // login with new user to get token.
          const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const packet = {token : newloginres.body.token};
        const res = await request("http://localhost:8080").post('/Request/delete').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return if no ngo_id is found in request list', async () => {
          // signup with new user to get token.
          const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
          const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
  
          // login with new user to get token.
          const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const packet = {token : newloginres.body.token,user_id:"6604383836a52af8f67ecc11"};
        const res = await request("http://localhost:8080").post('/Request/delete').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No Request found with the provided ID');
    });

    test('Return if user is successfully fetched ', async () => {
          // signup with new user to get token.
          const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
          const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
  
          // login with new user to get token.
          const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const packet = {token : newloginres.body.token,user_id:"6604383836a52af8f67ecc10"};
        const res = await request("http://localhost:8080").post('/Request/delete').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Request deleted successfully');
    });
}
)
describe('updating Role', () => {

    test('Return error if user_id is missing', async () => {
          // signup with new user to get token.
          const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
          const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
  
          // login with new user to get token.
          const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const packet = {token : newloginres.body.token};
        const res = await request("http://localhost:8080").post('/Request/updateRole').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return if no ngo_id is found in request list', async () => {
          // signup with new user to get token.
          const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
          const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
  
          // login with new user to get token.
          const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const packet = {token : newloginres.body.token,user_id:"6604383836a52af8f67ecc11"};
        const res = await request("http://localhost:8080").post('/Request/updateRole').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No user found with that id');
    });

    test('Return if user is successfully fetched ', async () => {
          // signup with new user to get token.
          const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
          const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
  
          // login with new user to get token.
          const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const packet = {token : newloginres.body.token,user_id:"DEDVE001009"};
        const res = await request("http://localhost:8080").post('/Request/updateRole').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('role updated successfully');
    });
}
)   