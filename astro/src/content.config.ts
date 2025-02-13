import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const hendelseSchema = z.object({
    type: z.enum(['dåp', 'konfirmasjon', 'vielse']),
    dato: z.string().date(),
    sted: z.string(),
    personer: z.array(reference('personer')),
    kilde: z.object({
    tittel: z.string(),
    url: z.string()
    }).optional(),
    kommentar: z.string().optional()
})

export const personSchema = z.object({
  fornavn: z.string(),
  etternavn: z.string(),
  pikenavn: z.optional(z.string()),
  født: z.string().date(),
  beskrivelse: z.string().optional(),
  hendelser: z.optional(z.array(reference('hendelser'))),
  mor: z.optional(reference('personer')),
  far: z.optional(reference('personer')),
  barn: z.optional(z.array(reference('personer')))
})

const hendelser = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: "./../hendelser" }),
  schema: hendelseSchema
});

const personer = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: "./../personer" }),
  schema: personSchema
});



export const collections = { personer, hendelser };