import { getCollection } from "astro:content"
import { describe, expect, test } from "vitest"

const personer = await getCollection("personer")
const hendelser = await getCollection("hendelser")

describe.each(personer)("$id", ({ id, data }) => {
    test(`person er referert i egne hendelser`, () => {
            data.hendelser?.forEach((hendelse) => {
            const eksisterendeHendelse = hendelser.find((h) => h.id == hendelse.id)
            expect(eksisterendeHendelse).toBeDefined()
            expect(eksisterendeHendelse?.data.personer.map((p) => p.id)).contains(id)
            })
        }
    )
})

describe.each(hendelser)("$id", ({ id, data }) => {
    test(`hendelse er referert hos alle involverte personer`, () => {
            data.personer.forEach((person) => {
            const eksisterendePerson = personer.find((p) => p.id == person.id)
            expect(eksisterendePerson).toBeDefined()
            expect(eksisterendePerson?.data.hendelser?.map((h) => h.id)).contains(id)
            })
        }
    )
})

describe.each(personer)("$id", ({ id, data }) => {
    test(`person er foreldre av sine barn og barn av sine foreldre`, () => {
            data.barn?.forEach((barn) => {
                const barnEntitet = personer.find((b) => b.id == barn.id)
                expect(barnEntitet).toBeDefined()
                const foreldre = (barnEntitet?.data.mor ? [barnEntitet.data.mor] : []).concat(barnEntitet?.data.far ? [barnEntitet.data.far] : [])
                expect(foreldre.map((p) => p.id)).contains(id)
            })
            const morRef = data.mor
            if(morRef){
                const mor = personer.find((p) => p.id == morRef.id)
                expect(mor).toBeDefined()
                expect(mor?.data.barn?.map((b) => b.id)).contains(id)
            }
            const farRef = data.far
            if(farRef){
                const far = personer.find((p) => p.id == farRef.id)
                expect(far).toBeDefined()
                expect(far?.data.barn?.map((b) => b.id)).contains(id)
            }
        }
    )
})

