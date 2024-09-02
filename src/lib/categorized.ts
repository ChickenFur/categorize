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
		'accessories'
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
