import { useEffect } from "react";
import { MONTH_IMAGES } from "../data/monthImages";

export function useMonthImagePrefetch(currentMonth: number) {
    useEffect(() => {
        const months = [
            ((currentMonth - 1) + 12) % 12,
            (currentMonth + 1) % 12,
        ];

        const images = months.map((m) => {
            const img = new window.Image();
            img.src = MONTH_IMAGES[m].url;
            return img;
        });

        return () => {
            // Cancel pending loads by clearing src
            images.forEach((img) => {
                img.src = "";
            });
        };
    }, [currentMonth]);
}
