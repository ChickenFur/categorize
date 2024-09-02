import dotenv from 'dotenv';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { categorizationSchema } from '$lib/categorized';
import type { RequestHandler } from '@sveltejs/kit';

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
	process.exit(1);
}

const client = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
	const { images } = await request.json();

	const image1 = images[0];
	const image2 = images[1];

	const payload = {
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content: `You are a buyer for a reatail clothes reseller looking at an image of clothes. You will respond with the brand, size, buyPrice, and sellPrice and condition of the clothes. Buy price shouldn't be more then $10 as these are used items. You will return your response in formatted JSON with the following,
            {brand: '',
            size: '',
            condition: '',
            detailSummary: '',
            buyPrice: null,
            sellPrice: null,
            type: "shirt" || "pants" || "shorts" || "dress" || "other"
          }
          if detailSummary includes the type of clothing like shorts, shirt, pants, or dress, you put that in the type. If the clothing has stains or tears that are visible in the image, you should rate the condition as bad. If the clothing has no visible stains or tears, you should rate the condition as good. If the clothing has some visible wear, but no stains or tears, you should rate the condition as fair. If the clothing is in like-new condition, you should rate the condition as excellent.`ß
			},
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: `What brand and size are in this image of clothes? What type of clothing is it, shorts, pants, shirt, dress? What is the condition of the clothes? Rate as bad, good, fair, or excellent, based on stains, tears, and wear. An estimated buy price for the retailer and a sale price for other customers.`
					},
					{
						type: 'image_url',
						image_url: {
							url: image1
						}
					},
					{
						type: 'image_url',
						image_url: {
							url: image2
						}
					}
				]
			}
		],
		max_tokens: 800,
		response_format: zodResponseFormat(categorizationSchema, 'categorized')
	};

	const savedResponse = {
		id: 'chatcmpl-A2obDKF2WOWqz2Asb01t2E1J1Bf3H',
		object: 'chat.completion',
		created: 1725234523,
		model: 'gpt-4o-mini-2024-07-18',
		choices: [
			{
				index: 0,
				message: {
					role: 'assistant',
					content:
						'{"type":"shorts","brand":"Pearl Izumi","size":"X-Large","condition":"good","detailSummary":"Black shorts, elastic waistband, suitable for sports or casual wear, in good condition with minimal wear.","buyPrice":8,"sellPrice":20}',
					refusal: null
				},
				logprobs: null,
				finish_reason: 'stop'
			}
		],
		usage: {
			prompt_tokens: 51344,
			completion_tokens: 56,
			total_tokens: 51400
		},
		system_fingerprint: 'fp_9722793223'
	};

	//return new Response(JSON.stringify(savedResponse));
	try {
		const chatCompletion = await client.chat.completions.create(payload);
		console.log('chatCompletion', chatCompletion);

		return new Response(JSON.stringify(chatCompletion), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (e) {
		console.log('error', e);
		return new Response(JSON.stringify(e), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
