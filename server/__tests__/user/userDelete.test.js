const request = require('supertest')

describe('User Delete', () => {
    test('Return error if token is not set properly', async () => {
        // No token.
        const res = await request("http://localhost:8080").post('/user/delete')
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Autherization failed due to absence of token');
    });
    test('Return error if user to delete does not exist', async () => {
        // Make a new user.
        const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
        const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)

        // login with new user to get token.
        const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const deletepacket = {token:newloginres.body.token};

        // Delete the new user.
        const delres = await request("http://localhost:8080").post('/user/delete').send(deletepacket).set('Authorization', `Bearer ${newloginres.body.token}`);

        // Try to delete again. No entry will be there in Users collection.
        const res = await request("http://localhost:8080").post('/user/delete').send(deletepacket).set('Authorization', `Bearer ${newloginres.body.token}`);
        
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('No user found with the provided ID');
    });
    test('Successful delete', async () => {
        // Make a new user.
        const newuserpacket = {name:"name", password:"pass", email:"temp@gmail.com"}
        const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)

        // Login with new user to get token.
        const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)

        // Use token and delete the newly created user.
        const deletepacket = {token:newloginres.body.token};
        const res = await request("http://localhost:8080").post('/user/delete').send(deletepacket).set('Authorization', `Bearer ${newloginres.body.token}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User deleted successfully');
    });
});
