import { useCalendarStore } from "../store/calendarStore";
import { ThemeManager } from "../components/ThemeManager";
import { HolidayTooltip } from "../components/HolidayTooltip";
import { Toolbar } from "../components/Toolbar";
import { motion } from "framer-motion";
import { HeroImage } from "../components/HeroImage";
import { RangeSelector } from "../components/RangeSelector";
import { CalendarGrid } from "../components/CalendarGrid";
import { NotesPanel } from "../components/NotesPanel";
import { useMonthImagePrefetch } from "../hooks/use-month-image-prefetch";

const CalendarPage = () => {
    
    const { currentMonth, currentYear, season } = useCalendarStore();
  
    useMonthImagePrefetch(currentMonth);

    return (
        <>
            <ThemeManager />
            <HolidayTooltip />

            <div className="min-h-screen bg-background flex flex-col">
                <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-40">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" className="text-primary"/>
                                <path d="M1 6h12" stroke="currentColor" strokeWidth="1.5" className="text-primary"/>
                                <path d="M4 1v3M10 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary"/>
                            </svg>
                        </div>
                        <h1 className="font-serif text-lg font-semibold text-foreground tracking-tight">
                            Calendar
                        </h1>
                    </div>
                    <Toolbar />
                </header>

                <main className="flex-1 flex items-start p-3 sm:p-5 lg:p-8">
                    <div className="w-full max-w-6xl mx-auto">
                        <motion.div
                        className="flex flex-col lg:flex-row gap-4 lg:gap-0 calendar-shadow dark:calendar-shadow-dark rounded-2xl overflow-hidden bg-card"
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className="w-full lg:w-70 xl:w-[320px] shrink-0 h-55 lg:h-auto">
                                <HeroImage month={currentMonth} year={currentYear} season={season} />
                            </div>

                            <div className="flex-1 flex flex-col border-t lg:border-t-0 lg:border-l border-border/50">
                                <div className="flex-1 p-4 sm:p-5 xl:p-6 flex flex-col">
                                    <div className="mb-3">
                                        <RangeSelector />
                                    </div>
                                    <div className="flex-1">
                                        <CalendarGrid />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t lg:border-t-0 lg:border-l border-border/50 w-full lg:w-65 xl:w-72.5 shrink-0 flex flex-col">
                                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                    <NotesPanel />
                                </div>
                            </div>
                        </motion.div>

                        <div className="mt-4 flex items-center justify-center">
                            <p className="text-xs font-sans text-muted-foreground/50">
                                Press{' '}
                                <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground">←</kbd>{' '}
                                <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground">→</kbd>{' '}
                                to navigate &bull;{' '}
                                <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground">T</kbd>{' '}
                                for today &bull;{' '}
                                <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground">Esc</kbd>{' '}
                                to clear selection
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default CalendarPage
