const request = require('supertest')

describe('Adding Role on signup', () => {
    test('Return error if user id is missing', async () => {
        const packet = { 
            ngo_id :  "65f04de683c50c03dfd91263",
            role : "volunteer",   
        };
        const res = await request("http://localhost:8080").post('/roles/signupRole').send(packet)
        console.log(res.body);
        expect(res.status).toBe(500);
    });
    test('Return error if ngo id is missing', async () => {
        const packet = { 
            user_id :  "65f04de683c50c03dfd91263",
            role : "volunteer",   
        };
        const res = await request("http://localhost:8080").post('/roles/signupRole').send(packet)
        console.log(res.body);
        expect(res.status).toBe(500);
    });
    test('Successfully added role of a user for an Ngo', async () => {
        const packet = {
            ngo_id: '65da11a82216111bff5d0bae',
            role : "volunteer", 
            user_id: '65da117c2216111bff5d0b44'            };
        const res = await request("http://localhost:8080").post('/roles/signupRole').send(packet)
        //console.log(res.body);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Role signed up successfully');
    });
 
});

describe('deleting Role', () => {
    test('Successfully deleted role of a user for an Ngo', async () => {
        const packet = {
            ngo_id: '65da11a82216111bff5d0bae',
            user_id: '65da117c2216111bff5d0b44'            };
        const res = await request("http://localhost:8080").post('/roles/deleteRole').send(packet)
        //console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Role removed successfully');
    });
 
});