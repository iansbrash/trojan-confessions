import axios from 'axios';

const isEmoji = (s : string) : boolean => {
    return /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
    .test(s);
}


export const retrieveEmojipediaImage = async (emoji: string) => {

    console.log(encodeURI(`https://emojipedia.org/search/?q=${emoji}`))

    // const corsAnywhereLink = 'https://cors-anywhere.herokuapp.com/';
    const corsAnywhereLink = 'https://trojan-confessions-cors.herokuapp.com/';
    // const corsAnywhereLink = 'http://localhost:8080/';
    
    const emojipediaRes = await axios({
        method: 'get',
        url: encodeURI(`${corsAnywhereLink}https://emojipedia.org/search/?q=${emoji}`),
        headers: {
            origin: window.location.protocol + '//' + window.location.host,
        }
    })


    const finalUrl = emojipediaRes.headers['x-final-url'];

    const emojiToText = finalUrl.substring(23, finalUrl.length - 1);

    // const emojiToText = emojipediaRes.request.path.substring(1, emojipediaRes.request.path.length - 1);
    const res = await axios({
        method: 'get',
        url: `https://emoji-api.com/emojis/${emojiToText}?access_key=16f77c6c04948b6de49269e3941e9a993df70e14`,
    })

    // can also be 120
    const resolution = 60;

    if (res.data){
        let newUrl = `https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/${resolution}/apple/285/${emojiToText}_${res.data['0']['codePoint'].split(' ').join('-').toLowerCase()}.png`
        return newUrl;
    }
    else {
        console.log(`No res data from emoji-api for ${emoji}`)
        return emoji;
    }
}

export default isEmoji;