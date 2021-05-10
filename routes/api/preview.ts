"use strict";

import express from 'express';
const router = express.Router();
import cors from "cors";

router.use(cors());


router.get('/', (req, res) => {

    const {
        theme,
        confession,
        location,
        school,
        fraternity,
        year
    } = req.query;

    switch (theme) {
        case "imessage":
            res.send(`
                <div class="w-96">
                    <div id="theme" class="aspect-h-1 aspect-w-1 bg-gray-200 rounded-lg px-5 shadow-md">
                        <div class="flex justify-center items-center">
                            <div class="flex flex-col justify-center items-end h-96 w-96 bg-gray-900 rounded-md shadow-md">
                                <div class="leading-6 mr-4 break-words max-w-xs relative rounded-xl text-white text-xl flex-initial bg-blue-400 py-1 px-2 mb-0.5">
                                    ${confession}
                                </div>
                                <div class="leading-6 mr-4 break-words max-w-xs relative rounded-xl text-white text-xl flex-initial bg-blue-400 py-1 px-2 mb-0.5">
                                    -Anonymous ${year === '' ? 'Student' : year} ${location === '' ? '' : `at ${location}`} ${school === '' ? '' : `studying at ${school}`} ${fraternity === '' ? '' : `in ${fraternity}`}
                                    <div class="transform translate-x-0.5 absolute bottom-0 -right-2.5 h-5 w-5 bg-blue-400 rounded-full"></div>
                                    <div class="transform translate-x-0.5 absolute bottom-0 -right-3.5 h-4 w-4 bg-gray-900 rounded-full"></div>
                                    <div class="transform translate-x-0.5 absolute bottom-2 -right-3.5 h-4 w-4 bg-gray-900"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
            break;
        case "zoom":
            //asd
            break;
        default:
            //code block
    }

    return;

    // res.sendFile



    // return res.send('ok!');
});




export default router;
