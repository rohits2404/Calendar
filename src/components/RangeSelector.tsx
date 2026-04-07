import { AnimatePresence, motion } from "framer-motion";
import { useCalendarStore } from "../store/calendarStore";
import { countDaysInRange, formatDisplayDate } from "../utils/dateUtils";
import { CalendarRange, X } from "lucide-react";

export function RangeSelector() {
  
    const { selectedStartDate, selectedEndDate, selectionStep, clearSelection } = useCalendarStore();

    const hasStart = !!selectedStartDate;
    const hasEnd = !!selectedEndDate;
    const dayCount = hasStart && hasEnd ? countDaysInRange(selectedStartDate!, selectedEndDate!) : null;

    return (
        <AnimatePresence>
            {hasStart && (
                <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl bg-primary/8 border border-primary/20 text-sm font-sans"
                >
                    <CalendarRange size={14} className="text-primary shrink-0" />
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-medium text-primary text-xs">
                            {formatDisplayDate(selectedStartDate!)}
                        </span>
                        {hasEnd ? (
                            <>
                                <span className="text-muted-foreground/60 text-xs">→</span>
                                <span className="font-medium text-primary text-xs">
                                    {formatDisplayDate(selectedEndDate!)}
                                </span>
                                {dayCount && (
                                    <span className="text-xs text-muted-foreground ml-1">
                                        ({dayCount} day{dayCount !== 1 ? 's' : ''})
                                    </span>
                                )}
                            </>
                        ) : (
                            <>
                                <span className="text-muted-foreground/60 text-xs">→</span>
                                <span className="text-xs text-muted-foreground italic">
                                    {selectionStep === 'start' ? 'Click end date' : '...'}
                                </span>
                            </>
                        )}
                    </div>
                    <button
                    onClick={clearSelection}
                    className="p-1 rounded-md hover:bg-primary/20 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label="Clear selection"
                    >
                        <X size={12} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
