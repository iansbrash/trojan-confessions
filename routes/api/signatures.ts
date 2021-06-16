"use strict";

import express from 'express';
const router = express.Router();
import cors from "cors";

// lets us use process.env variables
router.use(cors());

router.get('/location', (req, res) => {
    console.log('========================');
    console.log(`in GET(/api/signatures/location)`);
    console.log('========================');
    
    const LocationArray : string[] = [
        'Lorenzo',
        'Gateway',
        'Shrine',
        'Icon',
        'Victory',
        'West',
        
        // On Campus Housing Freshman
        'Birnkrant',
        'New North',
        'McCarthy',
        'Pardee',
        'Fluor',

        // On Campus Sophomores
        'Village Housing'
    ];

    return res.send(LocationArray);
});

router.get('/school', (req, res) => {
    console.log('========================');
    console.log(`in GET(/api/signatures/school)`);
    console.log('========================');
    
    const SchoolArray : string[] = [
        'Marshall',
        'Viterbi',
        'Annenberg',
        'Dornsife',
        'Roski',
        'Architecture',
        'Iovine and Young',
        'SCA', // School of Cinematic Arts
        'Kaufman', // Dance
        'Davis',
        'Keck',
        'Thorton',
        'Pharmacy',
        'Price'
    ];

    return res.send(SchoolArray);
});

router.get('/fraternity', (req, res) => {
    console.log('========================');
    console.log(`in GET(/api/signatures/fraternity)`);
    console.log('========================');
    
    const GreekLifeArray : string[] = [
        'Sigma Nuts',
        'Pike Spikes',
        'Teeck'
    ];

    return res.send(GreekLifeArray);
});

router.get('/year', (req, res) => {
    console.log('========================');
    console.log(`in GET(/api/signatures/year)`);
    console.log('========================');
    
    const GraduationYearArray : string[] = [
        'Freshman',
        'Sophomore',
        'Junior',
        'Senior',
        'Alumnus'
    ];

    return res.send(GraduationYearArray);
});

export default router;