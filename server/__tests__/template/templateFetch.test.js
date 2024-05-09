const request = require('supertest')

describe("Storing template variables", ()=>{
	let loginres;

    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        loginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
		token = loginres.body.token;
    });
	test('Return error if token is not set properly', async () => {
        // No token.
        const res = await request("http://localhost:8080").post('/templates/fetchtemplate')
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Autherization failed due to absence of token');
    });

	test("Return error when missing NGO details", async ()=>{
		// No ngo_id provided.
		packet = { token:loginres.body.token }
		const res = await request("http://localhost:8080").post('/templates/fetchtemplate').send(packet).set('Authorization', `Bearer ${token}`)

		expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing NGO details');
	});

	test("Return error if invalid NGO is being fetched", async ()=>{
		// ngo_id provided is not in templates collection.
		packet = { token:loginres.body.token, ngo_id:'661272d8a0de69c7dcae55f0'}
		const res = await request("http://localhost:8080").post('/templates/fetchtemplate').send(packet).set('Authorization', `Bearer ${token}`)

		expect(res.status).toBe(404);
        expect(res.body.error).toBe('Template not found for the provided NGO ID');
	});

	test("Successful fetching of NGO variables", async ()=>{
		// Valid ngo_id copied from mongo atlas.
		packet = { token:loginres.body.token, ngo_id:'663d1da18fdffcd58872d2cd'}
		const res = await request("http://localhost:8080").post('/templates/fetchtemplate').send(packet).set('Authorization', `Bearer ${token}`)

		expect(res.status).toBe(200);
        expect(res.body.message).toBe('Successfully fetched template variables');
	});

})