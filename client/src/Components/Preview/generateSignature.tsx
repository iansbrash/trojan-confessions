interface GenSigProps {
    location: string,
    school: string,
    fraternity: string,
    year: string
}

const generateSignature = ({
    location,
    school,
    fraternity,
    year
} : GenSigProps) => {
    return `-Anonymous ${year === '' ? 'Student' : year}${location === '' ? '' : ` at ${location}`}${school === '' ? '' : ` studying at ${school}`}${fraternity === '' ? '' : ` in ${fraternity}`}`
}

export default generateSignature;