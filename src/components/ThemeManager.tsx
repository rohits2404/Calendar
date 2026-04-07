import { useEffect } from "react";
import { useCalendarStore } from "../store/calendarStore";

export function ThemeManager() {
  
    const { isDark, season } = useCalendarStore();

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter');
        if (season !== 'default') {
            root.classList.add(`theme-${season}`);
        }
    }, [season]);

    return null;
}
