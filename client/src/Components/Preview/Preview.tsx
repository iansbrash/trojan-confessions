import { ReactComponent } from '*.svg';
import React, {
    FC,
    useState
} from 'react';
import IMessage from './iMessage';
import Zoom from './Zoom';
import Email from './Email';
import Tinder from './Tinder';

import * as htmlToImage from 'html-to-image';

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
        <div className="bg-red-400 rounded-md shadow-md">
            <button 
            onClick={() => setTheme(themeIndex)}
            className="text-white font-bold my-1 mx-2 focus:outline-none outline-none">
                {theme}
            </button>
        </div>
    )
}

const Preview : FC = () => {

    const SaveImage = () => {
        htmlToImage.toJpeg(document.getElementById('theme')!, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });
    }


    const themesArray = [
        'iMessage',
        'Zoom',
        'Email',
        'Tinder'
    ]

    const tempConfession = "I stole some sped kids keychain after they bait-and-switched me with some bug spray. I also had sexual relations with Andy Cruz's succulent plant. On top of that, I made three seperate posts on uscmissedconnections about my friends so they wouldn't feel so lonely.";
    const tempLocation = "Lorenzo";
    const tempSchool = "Viterbi";
    const tempFraternity = "Ligma Nu";
    const tempYear = "Freshman";
    const tempTags = ["FuckCovid", "JustinIsHot"]


    const themesElementArray = [
        <IMessage 
            confessionInput={tempConfession}
            location={tempLocation}
            school={tempSchool}
            fraternity={tempFraternity}
            year={tempYear}
            tags={tempTags}
        />,
        <Zoom 
            confessionInput={tempConfession}
            location={tempLocation}
            school={tempSchool}
            fraternity={tempFraternity}
            year={tempYear}
            tags={tempTags}
        />,
        <Email 
            confessionInput={tempConfession}
            location={tempLocation}
            school={tempSchool}
            fraternity={tempFraternity}
            year={tempYear}
            tags={tempTags}
        />,
        <Tinder 
            confessionInput={tempConfession}
            location={tempLocation}
            school={tempSchool}
            fraternity={tempFraternity}
            year={tempYear}
            tags={tempTags}
        />

    ]

    const [currentTheme, setCurrentTheme] = useState<number>(0);


    return (
        <div className="flex w-screen h-screen flex-col justify-center items-center bg-gray100">
            {/* Options */}
            <div className="flex flex-row space-x-4 m-4">
                {
                    themesArray.map((t, i) => <ThemeButton theme={t} themeIndex={i} setTheme={setCurrentTheme}/>)
                }
                <div className="bg-red-600 rounded-md shadow-md">
                    <button 
                    onClick={() => SaveImage()}
                    className="text-white font-bold my-1 mx-2 focus:outline-none outline-none">
                        Download
                    </button>
                </div>
            </div>

            {/* Theme */}
            <div className="w-96">
                <div id="theme" className={`aspect-h-1 aspect-w-1 bg-gray-200 rounded-lg px-5 shadow-md`}>
                    {themesElementArray[currentTheme]}
                </div>
            </div>
        </div>
    )
}


export default Preview;