import type { Person } from "./types"

export const upperFirstChar = (str: string) => str[0].toUpperCase() + str.slice(1)

export const formatDate = (date: string) => new Date(date).toLocaleDateString("no-NB")

export const getPersonDisplayName = (person: Person) => `${person.fornavn} ${person.etternavn}`