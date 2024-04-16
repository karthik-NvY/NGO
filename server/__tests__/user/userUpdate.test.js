const request = require('supertest')

describe('User Update', () => {
    test('Return error if token is not set properly', async () => {
        // No token.
        const res = await request("http://localhost:8080").post('/user/update')
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Autherization failed due to absence of token');
    });

    test('Return error if no data is being updated', async () => {
        // Login to get token.
        const userpacket = { password:"Sai Datta", email:"2021csb1106@iitrpr.ac.in"}
        const loginres = await request("http://localhost:8080").post('/user/login').send(userpacket)

        // Use token but nothing to update.
        const packet = {token:loginres.body.token};
        const res = await request("http://localhost:8080").post('/user/update').send(packet)

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('No data being updated');
    });

    test('No user found with the provided ID', async () => {
        // Make a new user
        const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
        const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)

        // Login with new user to get token.
        const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)

        // Delete new user.
        const deletepacket = {token:newloginres.body.token};
        const delres = await request("http://localhost:8080").post('/user/delete').send(deletepacket)

        // Try to update the new user with after deletion.
        const packet = {token:newloginres.body.token, newData:{name:"New name"}};
        const res = await request("http://localhost:8080").post('/user/update').send(packet)

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('No user found with the provided ID');
    });

    test('Successful update', async () => {
        // Login with a known account to get token.
        const userpacket = { password:"Sai Datta", email:"2021csb1106@iitrpr.ac.in"}
        const loginres = await request("http://localhost:8080").post('/user/login').send(userpacket)

        // Use token and update name
        const packet = {token:loginres.body.token, newData:{name:"Sai Datta"}};
        const res = await request("http://localhost:8080").post('/user/update').send(packet)

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User updated successfully');
    });
});
