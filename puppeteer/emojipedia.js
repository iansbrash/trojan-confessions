const axios = require('axios');
const runes = require('runes');

// const redHair = '👩‍🦰';

// const redCharCode = redHair.charCodeAt(0);


// console.log(redCharCode);
// console.log(String.fromCharCode(redCharCode))
// console.log(redHair)

// console.log(uni["👩‍🦰".charCodeAt(0)]);

const containsEmoji = (s) => {
    return s.match(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g);
}



const emojiArray = [
    '🔥', '⚱', '👲', '😅'
];


//https://stackoverflow.com/questions/18862256/how-to-detect-emoji-using-javascript
// console.log(/\p{Extended_Pictographic}/u.test('💯flowers 🌼🌺'.substr(0, 2)));

// if (/\p{Extended_Pictographic}/u.test('💯flowers 🌼🌺'.substr(0, 2))){
//     console.log('asdasdasd')
// }

// const ss = 'Wow i am fucking stupid 💯 I like flower 💮 what the fuck 👨👩‍🦰👨‍🦰 aaaaa';
// console.log(ss);
// console.log(ss.substr(1).substr(23, 3))


// return;

(async () => {
    const stringToParse = 'Wow i am fucking stupid 💯 I like flower 💮 what the fuck 👨👩‍🦰👨‍🦰 aaaaa';
    const splitString = runes(stringToParse);
    let toMapArray = [];

    // iterate over entire string one char at a time
    for (let i = 0; i < splitString.length; i++){

        // if is emoji
        // we add 'a' because it seems to only work on strings >= 2 char
        if (containsEmoji(splitString[i])){

            // console.log('found emoji!')

            const emoji = splitString[i];

            // console.log(emoji)

            console.log(encodeURI(`https://emojipedia.org/search/?q=${emoji}`))
            
            const emojipediaRes = await axios({
                method: 'get',
                url: encodeURI(`https://emojipedia.org/search/?q=${emoji}`)
            })

            const emojiToText = emojipediaRes.request.path.substring(1, emojipediaRes.request.path.length - 1);
            const res = await axios({
                method: 'get',
                url: `https://emoji-api.com/emojis/${emojiToText}?access_key=16f77c6c04948b6de49269e3941e9a993df70e14`,
            })


            if (res.data){
                let newUrl = `https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/${emojiToText}_${res.data['0']['codePoint'].split(' ').join('-').toLowerCase()}.png`
                toMapArray.push(newUrl);
            }
            else {
                console.log(`No res data from emoji-api for ${splitString[i]}`)
            }
        }
        // if not emoji
        else {
            
            toMapArray.push(splitString[i]);
        }
    }

    console.log(toMapArray);
})();

return;

(async () => {
    for (let i = 0; i < emojiArray.length; i++){

        console.log(encodeURI(`https://emojipedia.org/search/?q=${emojiArray[i]}`))
        const emojipediaRes = await axios({
            method: 'get',
            url: encodeURI(`https://emojipedia.org/search/?q=${emojiArray[i]}`)
        })

        console.log(emojipediaRes.request.path);

        // return;
        const emojiToText = emojipediaRes.request.path.substring(1, emojipediaRes.request.path.length - 1);
        console.log(emojiToText)
        const res = await axios({
            method: 'get',
            url: `https://emoji-api.com/emojis/${emojiToText}?access_key=16f77c6c04948b6de49269e3941e9a993df70e14`,
        })

        console.log(Object.keys(res.data));


        let newUrl = `https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/${emojiToText}_${res.data['0']['codePoint'].split(' ').join('-').toLowerCase()}.png`
        console.log(newUrl);
    }   
})();