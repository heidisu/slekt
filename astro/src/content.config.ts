import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const hendelser = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: "./../hendelser" }),
  schema: z.object({
    type: z.enum(['dåp', 'konfirmasjon', 'bryllup']),
    dato: z.string().date(),
    sted: z.string(),
    personer: z.array(reference('personer')),
    kilde: z.object({
      tittel: z.string(),
      url: z.string()
    })
  })
});

const personer = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: "./../personer" }),
  schema: z.object({
    fornavn: z.string(),
    etternavn: z.string(),
    pikenavn: z.optional(z.string()),
    født: z.string().date(),
    hendelser: z.optional(z.array(reference('hendelser'))),
    mor: z.optional(reference('personer')),
    far: z.optional(reference('personer')),
  })
});



export const collections = { personer, hendelser };