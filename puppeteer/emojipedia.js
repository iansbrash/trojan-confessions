const uni = require('unicode/category/So');
const axios = require('axios');

// const redHair = '👩‍🦰';

// const redCharCode = redHair.charCodeAt(0);


// console.log(redCharCode);
// console.log(String.fromCharCode(redCharCode))
// console.log(redHair)

// console.log(uni["👩‍🦰".charCodeAt(0)]);



const emojiArray = [
    '🔥', '⚱', '👲', '😅'
];


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