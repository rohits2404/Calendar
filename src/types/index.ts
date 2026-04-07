export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type Theme = 'spring' | 'summer' | 'autumn' | 'winter' | 'default';

export interface CalendarNote {
    id: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    text: string;
    color: NoteColor;
    type: 'day' | 'range' | 'month';
    month?: string;
    createdAt: string;
}

export type NoteColor = 'amber' | 'rose' | 'sky' | 'emerald' | 'violet' | 'orange';

export interface Holiday {
    date: string;
    name: string;
    country: string;
}

export interface CalendarState {
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
}
