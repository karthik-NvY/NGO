const request = require('supertest')
id = '';

describe('Storing tasks', () => {

    test('Return error if ngo_id is missing', async () => {
        const packet = {title:"test3",description : "testing endpoints",date: new Date(),no_volunteer: "3"};
        const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return error if task title is missing', async () => {
        const packet = {ngo_id:'65da11a82216111bff5d0baf',description : "testing endpoints",date: new Date(),no_volunteer: "3"};
        const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return error if task description is missing', async () => {
        const packet = {ngo_id:'65da11a82216111bff5d0baf',title:"test3",date: new Date(),no_volunteer: "3"};
        const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });

    test('Return error if date is missing', async () => {
        const packet = {ngo_id:'65da11a82216111bff5d0baf',title:"test3",description : "testing endpoints",no_volunteer: "3"};
        const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing input data');
    });


    test('Stores tasks if all task details given', async () => {
        const packet = {ngo_id:'65da11a82216111bff5d0baf',title:"test3",description : "testing endpoints",date: new Date(),no_volunteer: "3"};
        const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('successfully task added');
        id = res.body.newTask._id;
    });
 
});

describe('fetching tasks', () => {

    test('Return error if given id is not a task id', async () => {
        const packet = {id:"45f90e7e26fa81bc305470dc"};
        const res = await request("http://localhost:8080").post('/task/fetchInfo').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No Task Information was found');
    });

    test('successfully fetches given task if id is present in database', async () => {

        const packet = {id:"65f8e718a63c61ad6e1f9537"};
        const res = await request("http://localhost:8080").post('/task/fetchInfo').send(packet)
        expect(res.status).toBe(200);
    });

 
});

describe('deleting tasks', () => {

    test('Return error if given id is not a task id', async () => {
        const packet = {id:"45f90e7e26fa81bc305470dc"};
        const res = await request("http://localhost:8080").post('/task/deleteInfo').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No task found with the provided ID');
    });

    test('successfully deletes the task if given task exists', async () => {
        //the id shpuld be changed before testing again
        const packet = {id: id};
        const res = await request("http://localhost:8080").post('/task/deleteInfo').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Task deleted successfully');
    });

});
