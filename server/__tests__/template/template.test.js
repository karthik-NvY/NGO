const request = require('supertest')

describe("Storing template variables", ()=>{
	test('Return error if token is not set properly', async () => {
        // No token.
        const res = await request("http://localhost:8080").post('/templates/storetemplate')
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Autherization failed due to absence of token');
    });

	test("Missing NGO template varibles", async ()=>{
		// Login to get token.
	    const userpacket = { password:"Sai Datta", email:"2021csb1106@iitrpr.ac.in"}
	    const loginres = await request("http://localhost:8080").post('/user/login').send(userpacket)

		packet = { token:loginres.body.token }
		const res = await request("http://localhost:8080").post('/templates/storetemplate').send(packet)

		expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing NGO template variables');
	});

	test("Return error if NGO already exists", async ()=>{
		// Login to get token.
	    const userpacket = { password:"Sai Datta", email:"2021csb1106@iitrpr.ac.in"}
	    const loginres = await request("http://localhost:8080").post('/user/login').send(userpacket)

		packet = { 
			token:loginres.body.token, 
			logo: "logo",
		    ngoName: "MM Nagarjuna",
		    heroImages: "heroImages",
		    aboutUsText: "aboutUsText",
		    aboutUsImage2: "aboutUsImage2",
		    recentEvents: "recentEvents",
		    email: "email",
		    phoneNumber: "phoneNumber",
		    contactImage: "contactImage"
		}
		const res = await request("http://localhost:8080").post('/templates/storetemplate').send(packet)

		expect(res.status).toBe(400);
        expect(res.body.error).toBe('NGO already exists');
	});

	// In this, after creation deletion is not done. So works only once.
	test("Successful creation of new NGO", async ()=>{
		// Login to get token.
	    const userpacket = { password:"Sai Datta", email:"2021csb1106@iitrpr.ac.in"}
	    const loginres = await request("http://localhost:8080").post('/user/login').send(userpacket)

		packet = { 
			token:loginres.body.token, 
			logo: "logo",
		    ngoName: "MM Nagarjuna Nannagaru",
		    heroImages: [
		        { id: 1, image: "image1.jpg" },
		        { id: 2, image: "image2.jpg" },
		        { id: 3, image: "image3.jpg" }
		    ],
		    aboutUsText: "aboutUsText",
		    aboutUsImage2: "aboutUsImage2",
		    recentEvents: [
		        { id: 1, image: "event1.jpg", description: "Description of event 1" },
		        { id: 2, image: "event2.jpg", description: "Description of event 2" },
		        { id: 3, image: "event3.jpg", description: "Description of event 3" }
		    ],
		    email: "email",
		    phoneNumber: "phoneNumber",
		    contactImage: "contactImage"
		}
		const res = await request("http://localhost:8080").post('/templates/storetemplate').send(packet)

		expect(res.status).toBe(201);
        expect(res.body.message).toBe('Template saved successfully');
	});

})