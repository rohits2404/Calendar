import { motion } from "framer-motion";
import { useCalendarStore } from "../store/calendarStore";
import type { Theme } from "../types";
import { Moon, Sun } from "lucide-react";

const SEASONS: { value: Theme; label: string; emoji: string }[] = [
    { value: 'spring', label: 'Spring', emoji: '🌸' },
    { value: 'summer', label: 'Summer', emoji: '☀️' },
    { value: 'autumn', label: 'Autumn', emoji: '🍂' },
    { value: 'winter', label: 'Winter', emoji: '❄️' },
];

export function Toolbar() {
  
    const { isDark, toggleDark, season, goToMonth, currentYear, currentMonth } = useCalendarStore();

    const handleSeasonSelect = (s: Theme) => {
        const seasonMonthMap: Record<Theme, number> = {
            spring: 3,
            summer: 6,
            autumn: 9,
            winter: 0,
            default: currentMonth,
        };
        goToMonth(currentYear, seasonMonthMap[s]);
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60">
                {SEASONS.map(s => (
                    <button
                    key={s.value}
                    onClick={() => handleSeasonSelect(s.value)}
                    title={s.label}
                    className={[
                    'px-2.5 py-1 rounded-lg text-xs font-sans font-medium transition-all duration-200',
                    season === s.value
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                    ].join(' ')}
                    >
                        <span className="mr-1">{s.emoji}</span>
                        <span className="hidden sm:inline">{s.label}</span>
                    </button>
                ))}
            </div>

            <motion.button
            onClick={toggleDark}
            className="p-2 rounded-xl bg-muted/60 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            whileTap={{ rotate: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
            >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
        </div>
    );
}
