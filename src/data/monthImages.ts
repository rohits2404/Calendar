export interface MonthImageData {
    url: string;
    credit: string;
    alt: string;
}

export const MONTH_IMAGES: Record<number, MonthImageData> = {
    0: {
        url: 'https://res.cloudinary.com/dfzosku4o/image/upload/w_900,q_85,f_auto,c_fill/v1775583409/hwkxraqd9unoox5cviaa.jpg',
        credit: 'Unsplash',
        alt: 'Snowy winter landscape with frost-covered trees',
    },
    1: {
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=900&q=85&auto=format&fit=crop',
        credit: 'Unsplash',
        alt: 'Valentine\'s roses and soft pink bokeh',
    },
    2: {
        url: 'https://res.cloudinary.com/dfzosku4o/image/upload/w_900,q_85,f_auto,c_fill/v1775582043/il4my0xwb8frzdbln7n6.jpg',
        credit: 'Unsplash',
        alt: 'Cherry blossoms in full bloom against blue sky',
    },
    3: {
        url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=85&auto=format&fit=crop',
        credit: 'Unsplash',
        alt: 'Spring tulip fields in vivid colors',
    },
    4: {
        url: 'https://res.cloudinary.com/dfzosku4o/image/upload/w_900,q_85,f_auto,c_fill/v1775582787/wu1pobfkunddjdodcom7.png',
        credit: 'Unsplash',
        alt: 'Lush green spring meadow with wildflowers',
    },
    5: {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85&auto=format&fit=crop',
        credit: 'Unsplash',
        alt: 'Tropical beach with turquoise water at sunset',
    },
    6: {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop',
        credit: 'Unsplash',
        alt: 'Mountain lake reflecting sunlit peaks in summer',
    },
    7: {
        url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85&auto=format&fit=crop',
        credit: 'Unsplash',
        alt: 'Golden wheat field at late summer sunset',
    },
    8: {
        url: 'https://res.cloudinary.com/dfzosku4o/image/upload/w_900,q_85,f_auto,c_fill/v1775583545/xhdwalofbip0e8bgdvy0.jpg',
        credit: 'Unsplash',
        alt: 'Autumn forest with golden and orange leaves',
    },
    9: {
        url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=900&q=85&auto=format&fit=crop',
        credit: 'Unsplash',
        alt: 'Dramatic fall foliage with misty morning light',
    },
    10: {
        url: 'https://res.cloudinary.com/dfzosku4o/image/upload/w_900,q_85,f_auto,c_fill/v1775582992/egy59ok2pzqjbgudamhj.jpg',
        credit: 'Unsplash',
        alt: 'First frost and fallen leaves on a quiet path',
    },
    11: {
        url: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=900&q=85&auto=format&fit=crop',
        credit: 'Unsplash',
        alt: 'Christmas winter wonderland with snow-covered pine trees',
    },
};

export const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export const SEASON_FOR_MONTH: Record<number, 'winter' | 'spring' | 'summer' | 'autumn'> = {
    0: 'winter',
    1: 'winter',
    2: 'spring',
    3: 'spring',
    4: 'spring',
    5: 'summer',
    6: 'summer',
    7: 'summer',
    8: 'autumn',
    9: 'autumn',
    10: 'autumn',
    11: 'winter',
};
