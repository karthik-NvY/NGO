const request = require('supertest')
const Ngos = require('../../models/ngoModel');
const sinon = require('sinon');



describe('Ngo Info', () => {

    test('Returns Ngo\'s data if found', async () => {
        const packet = {};
        const res = await request("http://localhost:8080").post('/api/ngoInfo').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("found");
    }); 

    test('Return message if no Ngos found', async () => {
        const packet = {};
        sinon.stub(Ngos, 'find').resolves([]);
        const res = await request("http://localhost:8080").post('/api/ngoInfo').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("No NGOs found");
        sinon.restore();
    });
});