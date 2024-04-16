const request = require('supertest')

describe('User Delete', () => {
    test('Return error if token is not set properly', async () => {
        const res = await request("http://localhost:8080").post('/user/delete')
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Autherization failed due to absence of token');
    });
    test('Successful delete', async () => {
        const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
        const newres = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
        const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)
        const deletepacket = {token:newloginres.body.token};
        const res = await request("http://localhost:8080").post('/user/delete').send(deletepacket)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User deleted successfully');
    });
});
