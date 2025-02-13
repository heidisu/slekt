
export const upperFirstChar = (str: string) => str[0].toUpperCase() + str.slice(1)

export const formatDate = (date: string) => new Date(date).toLocaleDateString("no-NB")
