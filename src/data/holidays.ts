import type { Holiday } from '../types';

export const HOLIDAYS_2024_2026: Holiday[] = [
    // ===== 2024 =====
    { date: '2024-01-01', name: "New Year's Day", country: 'IN' },
    { date: '2024-01-14', name: "Makar Sankranti", country: 'IN' },
    { date: '2024-01-26', name: "Republic Day", country: 'IN' },
    { date: '2024-03-08', name: "Maha Shivaratri", country: 'IN' },
    { date: '2024-03-25', name: "Holi", country: 'IN' },
    { date: '2024-04-11', name: "Eid al-Fitr", country: 'IN' },
    { date: '2024-04-17', name: "Ram Navami", country: 'IN' },
    { date: '2024-05-23', name: "Buddha Purnima", country: 'IN' },
    { date: '2024-06-17', name: "Eid al-Adha", country: 'IN' },
    { date: '2024-08-15', name: "Independence Day", country: 'IN' },
    { date: '2024-08-19', name: "Raksha Bandhan", country: 'IN' },
    { date: '2024-08-26', name: "Janmashtami", country: 'IN' },
    { date: '2024-10-02', name: "Gandhi Jayanti", country: 'IN' },
    { date: '2024-10-12', name: "Dussehra", country: 'IN' },
    { date: '2024-11-01', name: "Diwali", country: 'IN' },
    { date: '2024-12-25', name: "Christmas Day", country: 'IN' },

    // ===== 2025 =====
    { date: '2025-01-01', name: "New Year's Day", country: 'IN' },
    { date: '2025-01-14', name: "Makar Sankranti", country: 'IN' },
    { date: '2025-01-26', name: "Republic Day", country: 'IN' },
    { date: '2025-02-26', name: "Maha Shivaratri", country: 'IN' },
    { date: '2025-03-14', name: "Holi", country: 'IN' },
    { date: '2025-03-31', name: "Eid al-Fitr", country: 'IN' },
    { date: '2025-04-06', name: "Ram Navami", country: 'IN' },
    { date: '2025-05-12', name: "Buddha Purnima", country: 'IN' },
    { date: '2025-06-07', name: "Eid al-Adha", country: 'IN' },
    { date: '2025-08-15', name: "Independence Day", country: 'IN' },
    { date: '2025-08-09', name: "Raksha Bandhan", country: 'IN' },
    { date: '2025-08-16', name: "Janmashtami", country: 'IN' },
    { date: '2025-10-02', name: "Gandhi Jayanti", country: 'IN' },
    { date: '2025-10-02', name: "Dussehra", country: 'IN' },
    { date: '2025-10-21', name: "Diwali", country: 'IN' },
    { date: '2025-12-25', name: "Christmas Day", country: 'IN' },

    // ===== 2026 =====
    { date: '2026-01-01', name: "New Year's Day", country: 'IN' },
    { date: '2026-01-14', name: "Makar Sankranti", country: 'IN' },
    { date: '2026-01-26', name: "Republic Day", country: 'IN' },
    { date: '2026-02-15', name: "Maha Shivaratri", country: 'IN' },
    { date: '2026-03-04', name: "Holi", country: 'IN' },
    { date: '2026-03-20', name: "Eid al-Fitr", country: 'IN' },
    { date: '2026-03-25', name: "Ram Navami", country: 'IN' },
    { date: '2026-05-01', name: "Buddha Purnima", country: 'IN' },
    { date: '2026-05-27', name: "Eid al-Adha", country: 'IN' },
    { date: '2026-08-15', name: "Independence Day", country: 'IN' },
    { date: '2026-08-28', name: "Raksha Bandhan", country: 'IN' },
    { date: '2026-09-05', name: "Janmashtami", country: 'IN' },
    { date: '2026-10-02', name: "Gandhi Jayanti", country: 'IN' },
    { date: '2026-10-20', name: "Dussehra", country: 'IN' },
    { date: '2026-11-08', name: "Diwali", country: 'IN' },
    { date: '2026-12-25', name: "Christmas Day", country: 'IN' },
];

export function getHolidayForDate(dateStr: string): Holiday | undefined {
    return HOLIDAYS_2024_2026.find(h => h.date === dateStr);
}
