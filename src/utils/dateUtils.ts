export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

export function formatDateStr(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function parseDateStr(dateStr: string): { year: number; month: number; day: number } {
    const [year, month, day] = dateStr.split('-').map(Number);
    return { year, month: month - 1, day };
}

export function todayStr(): string {
    const now = new Date();
    return formatDateStr(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isWeekend(dateStr: string): boolean {
    const { year, month, day } = parseDateStr(dateStr);
    const dow = new Date(year, month, day).getDay();
    return dow === 0 || dow === 6;
}

export function formatDisplayDate(dateStr: string): string {
    const { year, month, day } = parseDateStr(dateStr);
    const date = new Date(year, month, day);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function getWeekdayLabel(index: number): string {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index];
}

export function getRangeLabel(start: string, end: string): string {
    const startD = formatDisplayDate(start);
    const endD = formatDisplayDate(end);
    return `${startD} - ${endD}`;
}

export function countDaysInRange(start: string, end: string): number {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.abs(e.getTime() - s.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}
