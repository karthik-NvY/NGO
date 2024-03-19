const request = require('supertest')

describe('Storing tasks', () => {

    test('Return error if ngo_id is missing', async () => {
        const packet = {title:"test2",description : "testing endpoints",date: new Date(),no_volunteer: "3"};
        const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return error if title is missing', async () => {
        const packet = {ngo_id:'65da11a82216111bff5d0baf',description : "testing endpoints",date: new Date(),no_volunteer: "3"};
        const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return error if description is missing', async () => {
        const packet = {ngo_id:'65da11a82216111bff5d0baf',title:"test2",date: new Date(),no_volunteer: "3"};
        const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return error if date is missing', async () => {
        const packet = {ngo_id:'65da11a82216111bff5d0baf',title:"test2",description : "testing endpoints",no_volunteer: "3"};
        const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });


    test('Return tasks if found', async () => {
        const packet = {ngo_id:'65da11a82216111bff5d0baf',title:"test2",description : "testing endpoints",date: new Date(),no_volunteer: "3"};
        const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('successfully task added');
    });
 
});