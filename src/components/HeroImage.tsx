import { memo, useCallback, useEffect, useState } from "react";
import { MONTH_IMAGES, MONTH_NAMES } from "../data/monthImages";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    month: number;
    year: number;
    season: string;
}

function isImageCached(url: string): boolean {
    const img = new window.Image();
    img.src = url;
    return img.complete;
}

export const HeroImage = memo(function HeroImage({ month, year }: Props) {

    const imageData = MONTH_IMAGES[month];
    const imageKey = `${year}-${month}`;

    const [loaded, setLoaded] = useState(() => isImageCached(imageData.url));

    useEffect(() => {
        if (isImageCached(imageData.url)) {
            setLoaded(true);
        } else {
            setLoaded(false);
        }
    }, [imageData.url]);

    const handleLoad = useCallback(() => setLoaded(true), []);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
            <AnimatePresence>
                {!loaded && (
                    <motion.div
                        key="skeleton"
                        className="absolute inset-0 bg-muted animate-pulse"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence mode="sync">
                <motion.div
                    key={imageKey}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.04 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <img
                        src={imageData.url}
                        alt={imageData.alt}
                        onLoad={handleLoad}
                        className="w-full h-full object-cover"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />
                    <div className="absolute inset-0 hero-overlay" />
                </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.div
                    key={imageKey}
                    className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                >
                    <div className="text-white">
                        <p className="text-xs font-sans font-medium tracking-[0.18em] uppercase opacity-80 mb-1">
                            {year}
                        </p>
                        <h2 className="font-serif text-3xl lg:text-4xl font-medium leading-tight">
                            {MONTH_NAMES[month]}
                        </h2>
                        <p className="text-xs mt-2 opacity-60 font-sans">
                            {imageData.alt}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
});
