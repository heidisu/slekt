import { file } from 'astro/loaders';
import fs from 'fs';
const  capitalize = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
}

const personContent = (id) => {
    let names = id.split("-")
    let lastName = capitalize(names[0])
    let firstName = names.slice(1).map((x) => capitalize(x)).join(' ')
    return `fornavn: ${firstName}
etternavn: ${lastName}
født: ''
`
}

const hendelseContent = (hendelseType) => {
    return `type: ${hendelseType}
dato: ''
sted:
kilde:
  tittel: ''
  url: ''
personer:
`
}

const toHendelseType = (arg) => {
    switch(arg){
        case 'd': return 'dåp'
        case 'k': return 'konfirmasjon'
        case 'v': return 'vielse'
        case 'b': return 'begravelse'
        case 'f': return 'folketelling'
        default: null
    }
}

const writeToFile = (filePath, content) => {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.log('Could not write file')
        }
    })
}

const args = process.argv.slice(2);
const kind = args[0]
if (kind === 'h' && args.length === 3){
    const hendelseType = toHendelseType(args[1])
    if (hendelseType){
        const filePath = `../hendelser/${args[2]}.yml`
        const content = hendelseContent(hendelseType)
        writeToFile(filePath, content)
    } else {
        console.log('Invalid hendelsestype')
    }

} else if (kind === 'p' && args.length === 2){
    const id = args[1]
    const content = personContent(id)
    console.log(content)
    const filePath = `../personer/${id}.yml`
    writeToFile(filePath, content)
} else {
    console.log("Invalid argument")
}
