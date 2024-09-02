import { writable } from 'svelte/store';
import { z } from 'zod';

export const categorizationSchema = z.object({
	type: z.enum([
		'shirt',
		'pants',
		'shorts',
		'dress',
		'other',
		'jacket',
		'coat',
		'shoes',
		'accessories',
		'sweat pants',
		'sweat shirt',
		'sweat shorts',
		'sweat dress',
		'athletic shorts',
		'athletic shirt',
		'athletic pants',
		'athletic dress',
		'athletic shoes',
		'boots',
		'sandals',
		'flip flops',
		'hat',
		'scarf',
		'gloves',
		'belt',
		'socks',
		'tights',
		'leggings',
		't-shirt',
		'long sleeve shirt',
		'short sleeve shirt',
		'tank top',
		'blouse',
		'sweater',
		'cardigan',
		'vest',
		'jacket',
		'dress',
		'skirt'
	]),
	brand: z.string(),
	size: z.string(),
	condition: z.string(),
	detailSummary: z.string(),
	buyPrice: z.number().nullable(),
	sellPrice: z.number().nullable()
});

export type Categorization = z.infer<typeof categorizationSchema>;

export const categorized = writable<Categorization>({
	type: 'other',
	brand: '',
	size: '',
	condition: '',
	detailSummary: '',
	buyPrice: null,
	sellPrice: null
});
