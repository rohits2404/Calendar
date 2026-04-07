import { AnimatePresence, motion } from "framer-motion";
import { getHolidayForDate } from "../data/holidays";
import { useCalendarStore } from "../store/calendarStore";

export function HolidayTooltip() {
  
    const { hoveredDate } = useCalendarStore();
  
    const holiday = hoveredDate ? getHolidayForDate(hoveredDate) : null;

    return (
        <AnimatePresence>
            {holiday && (
                <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                >
                    <div 
                    className="bg-foreground/90 text-background text-xs font-sans px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                        {holiday.name}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
