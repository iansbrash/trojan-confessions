import React, {
    FC,
    useState
} from 'react';
import IMessage from './iMessage';
import Zoom from './Zoom';
import Email from './Email';
import Tinder from './Tinder';
import Twitter from './Twitter';
import Snapchat from './Snapchat';
import Notes from './Notes';
import Instagram from './Instagram';

import * as htmlToImage from 'html-to-image';
import axios from 'axios';

interface ThemeButtonProps {
    theme: string,
    themeIndex: number,
    setTheme: (i : number) => void
}

const ThemeButton : FC<ThemeButtonProps> = ({
    theme,
    themeIndex,
    setTheme
} : ThemeButtonProps) => {
    return (
        <div className="m-1 bg-red-400 rounded-md shadow-md">
            <button 
            onClick={() => setTheme(themeIndex)}
            className="text-white font-bold my-1 mx-2 focus:outline-none outline-none">
                {theme}
            </button>
        </div>
    )
}

const Preview : FC = () => {


    const confessionArray = [
        "I stole some kids keychain after they stole my alcohol 👩‍🦰👨‍🦰👩‍🦱. I also had sexual relations with a succulent plant. 🔥👨🗿💂‍♀️👷‍♀️👩‍🎤💅✌ On top of that, I made three seperate posts on uscmissedconnections about my friends so they wouldn't feel so lonely.",
        "I stole some kids keychain after they stole my alcohol 💯. I also had sexual relations 👖 with a succulent plant.",
        "I stole some kids keychain 😊."
    ];

    const locationArray = ["University Gateway", "Lorenzo", ""];
    const schoolArray = ["School of Pharmacy", "Marshall", ""];
    const fraternityArray = ["Theta Kappa Epsilon", "Sigma Nu", ""];
    const yearArray = ["Sophomore", "Senior", ""];
    const tagsArray = [["FuckCovid", "JustinIsHot"], ["Demons"], []];

    const timestampArray = ['2021-05-13T01:13:28.120Z', '2021-05-27T19:59:49.911Z', '2021-05-30T17:53:09.106Z'];

    const SaveImage = () => {
        htmlToImage.toJpeg(document.getElementById('theme')!, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            console.log(dataUrl);
            link.click();
        });
    }

    const toggleSize = () => {
        setSizeIndex((sizeIndex + 1) % confessionArray.length)
    }



    const testFunction = () => {

        // const helloWorld = firebase.functions().httpsCallable('helloWord');
        // helloWorld()
        // .then((result) => {
        //     // Read result of the Cloud Function.
        //     var sanitizedMessage = result.data.text;
        //     console.log(sanitizedMessage);
        // });
        // axios.post("https://localhost:5001/trojan-confessions-449cf/us-central1/helloWorld", (res : object) => {
        //     console.log(res);
        // });
        console.log(`nah deprecated`)
    }   


    const themesArray = [
        'iMessage',
        'Zoom',
        'Email',
        'Tinder',
        'Twitter',
        'Snapchat',
        'Notes',
        'Instagram'
    ]

    const [sizeIndex, setSizeIndex] = useState<number>(0);

    // const tempConfession = "I stole some sped kids keychain after they bait-and-switched me with some bug spray. I also had sexual relations with Andy Cruz's succulent plant. On top of that, I made three seperate posts on uscmissedconnections about my friends so they wouldn't feel so lonely.";
    


    const themesElementArray = [
        <IMessage 
            confessionInput={confessionArray[sizeIndex]}
            location={locationArray[sizeIndex]}
            school={schoolArray[sizeIndex]}
            fraternity={fraternityArray[sizeIndex]}
            year={yearArray[sizeIndex]}
            tags={tagsArray[sizeIndex]}
            timestamp={timestampArray[sizeIndex]}
        />,
        <Zoom 
            confessionInput={confessionArray[sizeIndex]}
            location={locationArray[sizeIndex]}
            school={schoolArray[sizeIndex]}
            fraternity={fraternityArray[sizeIndex]}
            year={yearArray[sizeIndex]}
            tags={tagsArray[sizeIndex]}
            timestamp={timestampArray[sizeIndex]}
        />,
        <Email 
            confessionInput={confessionArray[sizeIndex]}
            location={locationArray[sizeIndex]}
            school={schoolArray[sizeIndex]}
            fraternity={fraternityArray[sizeIndex]}
            year={yearArray[sizeIndex]}
            tags={tagsArray[sizeIndex]}
            timestamp={timestampArray[sizeIndex]}
        />,
        <Tinder 
            confessionInput={confessionArray[sizeIndex]}
            location={locationArray[sizeIndex]}
            school={schoolArray[sizeIndex]}
            fraternity={fraternityArray[sizeIndex]}
            year={yearArray[sizeIndex]}
            tags={tagsArray[sizeIndex]}
            timestamp={timestampArray[sizeIndex]}
        />,
        <Twitter 
            confessionInput={confessionArray[sizeIndex]}
            location={locationArray[sizeIndex]}
            school={schoolArray[sizeIndex]}
            fraternity={fraternityArray[sizeIndex]}
            year={yearArray[sizeIndex]}
            tags={tagsArray[sizeIndex]}
            timestamp={timestampArray[sizeIndex]}
        />,
        <Snapchat 
            confessionInput={confessionArray[sizeIndex]}
            location={locationArray[sizeIndex]}
            school={schoolArray[sizeIndex]}
            fraternity={fraternityArray[sizeIndex]}
            year={yearArray[sizeIndex]}
            tags={tagsArray[sizeIndex]}
            timestamp={timestampArray[sizeIndex]}
        />,
        <Notes 
            confessionInput={confessionArray[sizeIndex]}
            location={locationArray[sizeIndex]}
            school={schoolArray[sizeIndex]}
            fraternity={fraternityArray[sizeIndex]}
            year={yearArray[sizeIndex]}
            tags={tagsArray[sizeIndex]}
            timestamp={timestampArray[sizeIndex]}
        />,
        <Instagram 
            confessionInput={confessionArray[sizeIndex]}
            location={locationArray[sizeIndex]}
            school={schoolArray[sizeIndex]}
            fraternity={fraternityArray[sizeIndex]}
            year={yearArray[sizeIndex]}
            tags={tagsArray[sizeIndex]}
            timestamp={timestampArray[sizeIndex]}
        />

    ]

    const [currentTheme, setCurrentTheme] = useState<number>(0);


    return (
        <div className="flex w-screen h-screen flex-col justify-center items-center bg-gray100">
            {/* Options */}
            <div className="flex flex-row m-4 flex-wrap">
                {
                    themesArray.map((t, i) => <ThemeButton theme={t} themeIndex={i} setTheme={setCurrentTheme}/>)
                }
                <div className="m-1 bg-red-600 rounded-md shadow-md">
                    <button 
                    onClick={() => toggleSize()}
                    className="text-white font-bold my-1 mx-2 focus:outline-none outline-none">
                        Toggle Size
                    </button>
                </div>
                <div className="m-1 bg-red-600 rounded-md shadow-md">
                    <button 
                    onClick={() => testFunction()}
                    className="text-white font-bold my-1 mx-2 focus:outline-none outline-none">
                        Test Functions
                    </button>
                </div>
                <div className="m-1 bg-red-600 rounded-md shadow-md">
                    <button 
                    id="download"
                    onClick={() => SaveImage()}
                    className="text-white font-bold my-1 mx-2 focus:outline-none outline-none">
                        Download
                    </button>
                </div>
            </div>

            {/* Theme */}
            <div className="w-96">
                <div id="theme" className={`aspect-h-1 aspect-w-1 bg-gray-200 px-5 shadow-md`}>
                    {themesElementArray[currentTheme]}
                </div>
            </div>
        </div>
    )
}


export default Preview;