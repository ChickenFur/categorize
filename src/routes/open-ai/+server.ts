import OpenAI from 'openai';
import OPENAI_API_KEY from '$env/static/private';

export async function POST(req: typeof Request, res: typeof Response) {
	//const { prompt } = req.body;
	console.log(req);
	console.log('myapi key is', OPENAI_API_KEY);
	res.json({ message: 'Hello from the server!' });

	// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
	// const response = await openai.chat.completions.create({
	// 	model: 'gpt-4o-mini',
	// 	messages: [
	// 		{
	// 			role: 'user',
	// 			content: [
	// 				{ type: 'text', text: 'What is the condition of these shorts, what size.' },
	// 				{
	// 					type: 'image_url',
	// 					image_url: {
	// 						url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg'
	// 					}
	// 				}
	// 			]
	// 		}
	// 	]
	// });
}
