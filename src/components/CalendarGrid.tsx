import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCalendarStore } from "../store/calendarStore";
import { getDaysInMonth, getFirstDayOfMonth, getWeekdayLabel } from "../utils/dateUtils";
import { MONTH_NAMES } from "../data/monthImages";
import { Calendar, ChevronLeft, ChevronRight, SkipBack } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { DateCell } from "./DateCell";

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

export function CalendarGrid() {
  
    const {
        currentYear,
        currentMonth,
        goToNextMonth,
        goToPrevMonth,
        goToToday,
        isAnimating,
        animationDirection,
        selectedStartDate,
        selectedEndDate,
        clearSelection,
    } = useCalendarStore();

    const gridRef = useRef<HTMLDivElement>(null);

    const daysInMonth = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth]);
    const firstDay = useMemo(() => getFirstDayOfMonth(currentYear, currentMonth), [currentYear, currentMonth]);

    const prevMonthDays = useMemo(() => {
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const daysInPrev = getDaysInMonth(prevYear, prevMonth);
        const cells = [];
        for (let i = firstDay - 1; i >= 0; i--) {
            cells.push({ day: daysInPrev - i, month: prevMonth, year: prevYear });
        }
        return cells;
    }, [currentYear, currentMonth, firstDay]);

    const currentMonthDays = useMemo(() => {
        const cells = [];
        for (let d = 1; d <= daysInMonth; d++) {
            cells.push({ day: d, month: currentMonth, year: currentYear });
        }
        return cells;
    }, [currentYear, currentMonth, daysInMonth]);

    const nextMonthDays = useMemo(() => {
        const totalCells = prevMonthDays.length + currentMonthDays.length;
        const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const cells = [];
        for (let d = 1; d <= remaining; d++) {
            cells.push({ day: d, month: nextMonth, year: nextYear });
        }
        return cells;
    }, [prevMonthDays.length, currentMonthDays.length, currentMonth, currentYear]);

    const allCells = useMemo(() => [
        ...prevMonthDays.map(c => ({ ...c, isCurrentMonth: false })),
        ...currentMonthDays.map(c => ({ ...c, isCurrentMonth: true })),
        ...nextMonthDays.map(c => ({ ...c, isCurrentMonth: false })),
    ], [prevMonthDays, currentMonthDays, nextMonthDays]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                goToNextMonth();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                goToPrevMonth();
                break;
            case 'Escape':
                clearSelection();
                break;
            case 't':
            case 'T':
                goToToday();
                break;
        }
    }, [goToNextMonth, goToPrevMonth, clearSelection, goToToday]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const pageVariants = {
        enter: (direction: 'next' | 'prev') => ({
            opacity: 0,
            y: direction === 'next' ? 20 : -20,
            rotateX: direction === 'next' ? 12 : -12,
        }),
        center: { opacity: 1, y: 0, rotateX: 0 },
        exit: (direction: 'next' | 'prev') => ({
            opacity: 0,
            y: direction === 'next' ? -20 : 20,
            rotateX: direction === 'next' ? -12 : 12,
        }),
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                    <h2 className="font-serif text-xl font-semibold text-foreground">
                        {MONTH_NAMES[currentMonth]} {currentYear}
                    </h2>
                </div>
                <div className="flex items-center gap-1">
                    <button
                    onClick={goToToday}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-sans font-medium rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                    title="Jump to today (T)"
                    aria-label="Go to today"
                    >
                        <Calendar size={13} />
                        Today
                    </button>
                    {(selectedStartDate || selectedEndDate) && (
                        <button
                        onClick={clearSelection}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-sans font-medium rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                        aria-label="Clear selection"
                        >
                            <SkipBack size={13} />
                            Clear
                        </button>
                    )}
                    <button
                    onClick={goToPrevMonth}
                    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Previous month (Left Arrow)"
                    disabled={isAnimating}
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                    onClick={goToNextMonth}
                    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Next month (Right Arrow)"
                    disabled={isAnimating}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 mb-1">
                {WEEKDAYS.map(i => (
                    <div key={i} className="text-center py-1">
                        <span 
                        className={[
                            'text-xs font-sans font-medium tracking-wide uppercase',
                            i === 0 || i === 6 ? 'text-muted-foreground/60' : 'text-muted-foreground',
                        ].join(' ')}>
                            {getWeekdayLabel(i)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex-1 page-flip-container" ref={gridRef} style={{ perspective: '1200px' }}>
                <AnimatePresence mode="wait" custom={animationDirection}>
                    <motion.div
                    key={`${currentYear}-${currentMonth}`}
                    custom={animationDirection}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="grid grid-cols-7 gap-0.5"
                    style={{ transformOrigin: 'top center' }}
                    >
                        {allCells.map((cell, idx) => (
                            <DateCell
                            key={`${cell.year}-${cell.month}-${cell.day}-${idx}`}
                            day={cell.day}
                            month={cell.month}
                            year={cell.year}
                            isCurrentMonth={cell.isCurrentMonth}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-3 pt-3 border-t border-border/60">
                <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span>Start / End</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-range-between border border-border/40" />
                        <span>Range</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full ring-2 ring-today ring-offset-1" />
                        <span>Today</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-holiday" />
                        <span>Holiday</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>Note</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
