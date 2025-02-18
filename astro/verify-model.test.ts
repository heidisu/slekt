import { getCollection } from "astro:content"
import { describe, expect, test } from "vitest"

const personer = await getCollection("personer")
const hendelser = await getCollection("hendelser")

describe.each(personer)("$id", ({ id, data }) => {
    test(`person er referert i egne hendelser`, () => {
            data.hendelser?.forEach((hendelse) => {
                console.log(id, hendelse)
            const eksisterendeHendelse = hendelser.find((h) => h.id == hendelse.id)
            expect(eksisterendeHendelse).toBeDefined()
            expect(eksisterendeHendelse?.data.personer.map((p) => p.id)).contains(id)
            })
        }
    )
})

describe.each(hendelser)("$id", ({ id, data }) => {
    test(`hendelse er referert hos alle personer`, () => {
            data.personer.forEach((person) => {
            const eksisterendePerson = personer.find((p) => p.id == person.id)
            expect(eksisterendePerson).toBeDefined()
            expect(eksisterendePerson?.data.hendelser?.map((h) => h.id)).contains(id)
            })
        }
    )
})