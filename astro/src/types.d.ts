import { hendelseSchema, personSchema } from "./content.config"

export type Hendelse = z.infer<typeof hendelseSchema>

export type Person = z.infer<typeof personSchema>