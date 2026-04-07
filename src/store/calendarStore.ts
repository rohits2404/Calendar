import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CalendarNote, NoteColor, Theme } from '../types';
import { SEASON_FOR_MONTH } from '../data/monthImages';

function formatDate(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getSeasonFromMonth(month: number): Theme {
    return SEASON_FOR_MONTH[month] as Theme;
}

interface CalendarStore {
    currentYear: number;
    currentMonth: number;
    selectedStartDate: string | null;
    selectedEndDate: string | null;
    selectionStep: 'none' | 'start' | 'end';
    hoveredDate: string | null;
    isDark: boolean;
    season: Theme;
    notes: CalendarNote[];
    activeNoteDate: string | null;
    isNotesPanelOpen: boolean;
    isAnimating: boolean;
    animationDirection: 'next' | 'prev';

    goToMonth: (year: number, month: number) => void;
    goToNextMonth: () => void;
    goToPrevMonth: () => void;
    goToToday: () => void;
    selectDate: (dateStr: string) => void;
    setHoveredDate: (dateStr: string | null) => void;
    clearSelection: () => void;
    toggleDark: () => void;
    setNote: (note: Omit<CalendarNote, 'id' | 'createdAt'>) => void;
    updateNote: (id: string, text: string, color: NoteColor) => void;
    deleteNote: (id: string) => void;
    setActiveNoteDate: (dateStr: string | null) => void;
    toggleNotesPanel: () => void;
    getNotesForDate: (dateStr: string) => CalendarNote[];
    getMonthNote: (year: number, month: number) => CalendarNote | undefined;
    getRangeNotes: () => CalendarNote[];
    isDateInRange: (dateStr: string) => boolean;
    isDateStart: (dateStr: string) => boolean;
    isDateEnd: (dateStr: string) => boolean;
}

const today = new Date();

export const useCalendarStore = create<CalendarStore>()(
    persist((set, get) => ({
        currentYear: today.getFullYear(),
        currentMonth: today.getMonth(),
        selectedStartDate: null,
        selectedEndDate: null,
        selectionStep: 'none',
        hoveredDate: null,
        isDark: false,
        season: getSeasonFromMonth(today.getMonth()),
        notes: [],
        activeNoteDate: null,
        isNotesPanelOpen: true,
        isAnimating: false,
        animationDirection: 'next',

        goToMonth: (year, month) => {
            set({ currentYear: year, currentMonth: month, season: getSeasonFromMonth(month) });
        },

        goToNextMonth: () => {
            const { currentYear, currentMonth } = get();
            set({ isAnimating: true, animationDirection: 'next' });
            setTimeout(() => {
                const newMonth = (currentMonth + 1) % 12;
                const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
                set({
                    currentMonth: newMonth,
                    currentYear: newYear,
                    season: getSeasonFromMonth(newMonth),
                    isAnimating: false,
                });
            }, 350);
        },

        goToPrevMonth: () => {
            const { currentYear, currentMonth } = get();
            set({ isAnimating: true, animationDirection: 'prev' });
            setTimeout(() => {
                const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
                set({
                    currentMonth: newMonth,
                    currentYear: newYear,
                    season: getSeasonFromMonth(newMonth),
                    isAnimating: false,
                });
            }, 350);
        },

        goToToday: () => {
            const now = new Date();
            set({
                currentYear: now.getFullYear(),
                currentMonth: now.getMonth(),
                season: getSeasonFromMonth(now.getMonth()),
            });
        },

        selectDate: (dateStr) => {
            const { selectionStep, selectedStartDate } = get();
            if (selectionStep === 'none' || selectionStep === 'end') {
                set({ selectedStartDate: dateStr, selectedEndDate: null, selectionStep: 'start' });
            } else if (selectionStep === 'start') {
                if (!selectedStartDate || dateStr < selectedStartDate) {
                    set({ selectedStartDate: dateStr, selectedEndDate: null, selectionStep: 'start' });
                } else if (dateStr === selectedStartDate) {
                    set({ selectedEndDate: null, selectionStep: 'none', selectedStartDate: null });
                } else {
                    set({ selectedEndDate: dateStr, selectionStep: 'end' });
                }
            }
        },

        setHoveredDate: (dateStr) => set({ hoveredDate: dateStr }),

        clearSelection: () => set({
            selectedStartDate: null,
            selectedEndDate: null,
            selectionStep: 'none',
            hoveredDate: null,
        }),

        toggleDark: () => set(state => ({ isDark: !state.isDark })),

        setNote: (note) => {
            const newNote: CalendarNote = {
                ...note,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
            };
            set(state => ({ notes: [...state.notes, newNote] }));
        },

        updateNote: (id, text, color) => {
            set(state => ({
                notes: state.notes.map(n => n.id === id ? { ...n, text, color } : n),
            }));
        },

        deleteNote: (id) => {
            set(state => ({ notes: state.notes.filter(n => n.id !== id) }));
        },

        setActiveNoteDate: (dateStr) => set({ activeNoteDate: dateStr }),

        toggleNotesPanel: () => set(state => ({ isNotesPanelOpen: !state.isNotesPanelOpen })),

        getNotesForDate: (dateStr) => {
            return get().notes.filter(n => n.type === 'day' && n.date === dateStr);
        },

        getMonthNote: (year, month) => {
            const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
            return get().notes.find(n => n.type === 'month' && n.month === monthKey);
        },

        getRangeNotes: () => {
            return get().notes.filter(n => n.type === 'range');
        },

        isDateInRange: (dateStr) => {
            const { selectedStartDate, selectedEndDate, hoveredDate, selectionStep } = get();
            if (!selectedStartDate) return false;
            const endDate = selectedEndDate || (selectionStep === 'start' ? hoveredDate : null);
            if (!endDate) return false;
            const [start, end] = selectedStartDate <= endDate
            ? [selectedStartDate, endDate]
            : [endDate, selectedStartDate];
            return dateStr > start && dateStr < end;
        },

        isDateStart: (dateStr) => get().selectedStartDate === dateStr,
        isDateEnd: (dateStr) => get().selectedEndDate === dateStr,
    }),
    {
        name: 'calendar-storage',
        partialize: (state) => ({
            notes: state.notes,
            isDark: state.isDark,
            currentYear: state.currentYear,
            currentMonth: state.currentMonth,
        }),
    }
));

export { formatDate };
