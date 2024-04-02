const request = require('supertest');
const Ngos = require('../../models/ngoModel');
const Ngohandler = require('../../controllers/NgoController');
jest.mock('../../models/ngoModel');
describe('Ngo Info', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    test('Return message if no Ngos found', async () => {
            const packet = {};
            Ngos.find.mockResolvedValue([])
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await Ngohandler.fetchNgoInfo(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({

            success: false,
            message: "No NGOs found"
        });
        });
    test('Returns Ngo\'s data if found', async () => {
        const packet = {};
        const allNgos = [{ngo_name: "ngo1"},{ngo_name: "ngo1"}];
            Ngos.find.mockResolvedValue(allNgos);
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await Ngohandler.fetchNgoInfo(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                allNgos,
                success: true,
                message: "NGOs found"
        });
    }); 

   
});  
jest.resetAllMocks();

describe('Ngo Info without mock', () => {

    test('Returns Ngo\'s data if found', async () => {
        const packet = {};
        const res = await request("http://localhost:8080").post('/api/ngoInfo').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("NGOs found");
    }); 
});
