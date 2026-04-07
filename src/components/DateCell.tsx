import { memo, useCallback } from "react";
import { formatDateStr, isWeekend, todayStr } from "../utils/dateUtils";
import { getHolidayForDate } from "../data/holidays";
import { useCalendarStore } from "../store/calendarStore";
import { motion } from "framer-motion";

interface Props {
    day: number;
    month: number;
    year: number;
    isCurrentMonth: boolean;
    tabIndex?: number;
}

export const DateCell = memo(function DateCell({ day, month, year, isCurrentMonth }: Props) {
  
    const dateStr = formatDateStr(year, month, day);
    const today = todayStr();
    const holiday = getHolidayForDate(dateStr);
    const weekend = isWeekend(dateStr);

    const {
        selectDate,
        setHoveredDate,
        isDateInRange,
        isDateStart,
        isDateEnd,
        getNotesForDate,
        setActiveNoteDate,
        isNotesPanelOpen,
        toggleNotesPanel,
    } = useCalendarStore();

    const isToday = dateStr === today;
    const isStart = isDateStart(dateStr);
    const isEnd = isDateEnd(dateStr);
    const isRange = isDateInRange(dateStr);
    const notes = isCurrentMonth ? getNotesForDate(dateStr) : [];
    const hasNotes = notes.length > 0;

    const handleClick = useCallback(() => {
        if (!isCurrentMonth) return;
        selectDate(dateStr);
        setActiveNoteDate(dateStr);
        if (!isNotesPanelOpen) toggleNotesPanel();
    }, [dateStr, isCurrentMonth, selectDate, setActiveNoteDate, isNotesPanelOpen, toggleNotesPanel]);

    const handleMouseEnter = useCallback(() => {
        if (isCurrentMonth) setHoveredDate(dateStr);
    }, [dateStr, isCurrentMonth, setHoveredDate]);

    const handleMouseLeave = useCallback(() => {
        setHoveredDate(null);
    }, [setHoveredDate]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    }, [handleClick]);

    if (!isCurrentMonth) {
        return (
            <div className="aspect-square flex items-center justify-center p-0.5">
                <span className="text-xs font-sans text-muted-foreground/30 select-none">{day}</span>
            </div>
        );
    }

    return (
        <motion.div
        className={[
            'relative aspect-square flex flex-col items-center justify-center cursor-pointer select-none',
            'rounded-lg transition-colors duration-100',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
            isStart || isEnd
            ? 'bg-primary text-primary-foreground'
            : isRange
            ? 'bg-range-between text-foreground rounded-none'
            : isToday
            ? 'ring-2 ring-today ring-offset-1 text-today font-medium'
            : 'hover:bg-muted',
            weekend && !isStart && !isEnd ? 'text-muted-foreground' : '',
        ].join(' ')}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${day} ${holiday ? `(${holiday.name})` : ''}`}
        aria-pressed={isStart || isEnd}
        whileHover={!isStart && !isEnd ? { scale: 1.08 } : {}}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.1 }}
        >
            <span className={[
                'text-xs lg:text-sm font-sans leading-none',
                isStart || isEnd ? 'font-semibold' : '',
                isToday && !isStart && !isEnd ? 'font-medium' : '',
            ].join(' ')}>
                {day}
            </span>

            {holiday && (
                <div
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-holiday"
                title={holiday.name}
                aria-hidden="true"
                />
            )}

            {hasNotes && !holiday && (
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-px">
                    {notes.slice(0, 3).map((note, i) => (
                        <div
                        key={i}
                        className={[
                            'w-1 h-1 rounded-full',
                            note.color === 'amber' ? 'bg-amber-500' :
                            note.color === 'rose' ? 'bg-rose-500' :
                            note.color === 'sky' ? 'bg-sky-500' :
                            note.color === 'emerald' ? 'bg-emerald-500' :
                            note.color === 'violet' ? 'bg-violet-500' :
                            'bg-orange-500',
                        ].join(' ')}
                        />
                    ))}
                </div>
            )}

            {holiday && hasNotes && (
                <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-primary" />
            )}    
        </motion.div>
    );
});
