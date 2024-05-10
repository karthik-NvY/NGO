const request = require('supertest')

describe("Storing template variables", ()=>{
    let loginres;

    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        loginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
		token = loginres.body.token
    });

	test('Return error if token is not set properly', async () => {
        // No token.
        const res = await request("http://localhost:8080").post('/templates/storetemplate')
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Autherization failed due to absence of token');
    });

	test("Missing NGO template varibles", async ()=>{
		// No Template values are given.
		packet = { token:loginres.body.token }
		const res = await request("http://localhost:8080").post('/templates/storetemplate').send(packet).set('Authorization', `Bearer ${token}`)


		expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing NGO template variables');
	});

	test("Return error if NGO already exists", async ()=>{
		// ngo already exists. Duplicate ngo names from same user are not allowed.
		const packet = {
            name : "Testing Ngo",
            visionText:"visionText",
			image_status: [],
            aboutUsText: "aboutUsText",
            eventBottomText: "eventBottomText",
            logo:"logo",
            main:"main",
            aboutUsImage:"default_images[2]",
            aboutUsImage2:"default_images[3]",
            contactImage:"default_images[4]",
            eventImages:[],
            eventDescriptions:"eventDescriptions",
            email:"email",
            phoneNumber:"phoneNumber",
            instahandle:"instahandle",
            xhandle:"xhandle",
        }
		
		const res = await request("http://localhost:8080").post('/templates/storetemplate').send(packet).set('Authorization', `Bearer ${token}`)


		expect(res.status).toBe(400);
        expect(res.body.error).toBe('NGO already exists');
	});

	// In this, after creation deletion is not done. So works only once.
	test("Successful creation of new NGO", async ()=>{
		// New creation of ngo.
		const packet = {
            name : "Testing",
			image_status : [],
            visionText:"visionText",
            aboutUsText: "aboutUsText",
            eventBottomText: "eventBottomText",
            logo:"logo",
            main:"main",
            aboutUsImage:"default_images[2]",
            aboutUsImage2:"default_images[3]",
            contactImage:"default_images[4]",
            eventImages:[],
            eventDescriptions:"eventDescriptions",
            email:"email",
            phoneNumber:"phoneNumber",
            instahandle:"instahandle",
            xhandle:"xhandle",
        }
		
		const res = await request("http://localhost:8080").post('/templates/storetemplate').send(packet).set('Authorization', `Bearer ${token}`)

		expect(res.status).toBe(201);
        expect(res.body.message).toBe('Template saved successfully');
	});
})