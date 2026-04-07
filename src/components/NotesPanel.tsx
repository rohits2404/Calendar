import { useEffect, useRef, useState } from "react";
import type { CalendarNote, NoteColor } from "../types";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Calendar, ChevronDown, ChevronRight, Layers, Plus, Trash2, X } from "lucide-react";
import { useCalendarStore } from "../store/calendarStore";
import { formatDisplayDate, getRangeLabel, todayStr } from "../utils/dateUtils";
import { MONTH_NAMES } from "../data/monthImages";

const NOTE_COLORS: { value: NoteColor; label: string; bg: string; dot: string }[] = [
    { value: 'amber', label: 'Amber', bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800', dot: 'bg-amber-500' },
    { value: 'rose', label: 'Rose', bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800', dot: 'bg-rose-500' },
    { value: 'sky', label: 'Sky', bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800', dot: 'bg-sky-500' },
    { value: 'emerald', label: 'Emerald', bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800', dot: 'bg-emerald-500' },
    { value: 'violet', label: 'Violet', bg: 'bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800', dot: 'bg-violet-500' },
    { value: 'orange', label: 'Orange', bg: 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800', dot: 'bg-orange-500' },
];

function getNoteColorStyle(color: NoteColor): string {
    return NOTE_COLORS.find(c => c.value === color)?.bg || NOTE_COLORS[0].bg;
}

function getDotColor(color: NoteColor): string {
    return NOTE_COLORS.find(c => c.value === color)?.dot || 'bg-amber-500';
}

interface NoteCardProps {
    note: CalendarNote;
    onDelete: (id: string) => void;
    onUpdate: (id: string, text: string, color: NoteColor) => void;
}

function NoteCard({ note, onDelete, onUpdate }: NoteCardProps) {
  
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(note.text);
    const [editColor, setEditColor] = useState<NoteColor>(note.color);
  
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (editing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.select();
        }
    }, [editing]);

    const handleSave = () => {
        if (editText.trim()) {
            onUpdate(note.id, editText.trim(), editColor);
        }
        setEditing(false);
    };

    const colorStyle = getNoteColorStyle(note.color);
    const dotColor = getDotColor(note.color);

    return (
        <motion.div
        layout
        initial={{ opacity: 0, y: -6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: -20, scale: 0.95 }}
        className={`relative rounded-xl border p-3 ${colorStyle} group cursor-pointer`}
        onClick={() => !editing && setEditing(true)}
        >
            <div className="flex items-start gap-2">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                <div className="flex-1 min-w-0">
                    {editing ? (
                        <div onClick={e => e.stopPropagation()}>
                            <textarea
                            ref={textareaRef}
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            className="w-full text-sm font-sans bg-transparent resize-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                            rows={3}
                            placeholder="Write your note..."
                            onKeyDown={e => {
                                if (e.key === 'Enter' && e.metaKey) handleSave();
                                if (e.key === 'Escape') setEditing(false);
                            }}
                            />
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex gap-1">
                                    {NOTE_COLORS.map(c => (
                                        <button
                                        key={c.value}
                                        onClick={() => setEditColor(c.value)}
                                        className={`w-4 h-4 rounded-full ${c.dot} transition-transform ${editColor === c.value ? 'scale-125 ring-2 ring-offset-1 ring-foreground/30' : 'opacity-60 hover:opacity-100'}`}
                                        title={c.label}
                                        />
                                    ))}
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setEditing(false)}
                                        className="text-xs font-sans px-2 py-0.5 rounded-md bg-muted/60 hover:bg-muted text-muted-foreground transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="text-xs font-sans px-2 py-0.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm font-sans text-foreground leading-relaxed whitespace-pre-wrap wrap-break-word">
                            {note.text}
                        </p>
                    )}
                </div>
                {!editing && (
                    <button
                        onClick={e => { e.stopPropagation(); onDelete(note.id); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-destructive shrink-0"
                        aria-label="Delete note"
                    >
                        <Trash2 size={12} />
                    </button>
                )}
            </div>
        </motion.div>
    );
}

interface AddNoteFormProps {
    onAdd: (text: string, color: NoteColor) => void;
    onCancel: () => void;
    placeholder?: string;
}

function AddNoteForm({ onAdd, onCancel, placeholder = "Add a Note..." }: AddNoteFormProps) {
  
    const [text, setText] = useState('');
    const [color, setColor] = useState<NoteColor>('amber');
  
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => { ref.current?.focus(); }, []);

    const handleSubmit = () => {
        if (text.trim()) {
            onAdd(text.trim(), color);
            setText('');
        }
    };

    return (
        <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="rounded-xl border border-primary/30 bg-card p-3"
        >
            <textarea
            ref={ref}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full text-sm font-sans bg-transparent resize-none focus:outline-none text-foreground placeholder:text-muted-foreground"
            onKeyDown={e => {
                if (e.key === 'Enter' && e.metaKey) handleSubmit();
                if (e.key === 'Escape') onCancel();
            }}
            />
            <div className="flex items-center justify-between mt-2">
                <div className="flex gap-1.5">
                    {NOTE_COLORS.map(c => (
                        <button
                        key={c.value}
                        onClick={() => setColor(c.value)}
                        className={`w-4 h-4 rounded-full ${c.dot} transition-transform ${color === c.value ? 'scale-125 ring-2 ring-offset-1 ring-foreground/30' : 'opacity-50 hover:opacity-100'}`}
                        title={c.label}
                        />
                    ))}
                </div>
                <div className="flex gap-1">
                    <button
                    onClick={onCancel}
                    className="text-xs font-sans px-2.5 py-1 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                    onClick={handleSubmit}
                    disabled={!text.trim()}
                    className="text-xs font-sans px-2.5 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-opacity"
                    >
                        Add
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

interface SectionProps {
    title: string;
    icon: React.ReactNode;
    count: number;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function Section({ title, icon, count, children, defaultOpen = true }: SectionProps) {
  
    const [open, setOpen] = useState(defaultOpen);
  
    return (
        <div className="mb-4">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 w-full text-left mb-2 group"
            >
                <span className="text-muted-foreground">{icon}</span>
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                    {title}
                </span>
                {count > 0 && (
                    <span className="ml-auto text-xs font-sans font-medium text-muted-foreground/70 bg-muted px-1.5 py-0.5 rounded-full">
                        {count}
                    </span>
                )}
                <span className="text-muted-foreground ml-auto">
                    {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function NotesPanel() {
  
    const {
        activeNoteDate,
        selectedStartDate,
        selectedEndDate,
        currentYear,
        currentMonth,
        notes,
        setNote,
        updateNote,
        deleteNote,
        getNotesForDate,
        getMonthNote,
        isNotesPanelOpen,
        toggleNotesPanel,
    } = useCalendarStore();

    const [addingDay, setAddingDay] = useState(false);
    const [addingRange, setAddingRange] = useState(false);
    const [addingMonth, setAddingMonth] = useState(false);

    const today = todayStr();
    const displayDate = activeNoteDate || today;
    const dayNotes = getNotesForDate(displayDate);
    const monthNote = getMonthNote(currentYear, currentMonth);
    const rangeNotes = notes.filter(n => n.type === 'range');

    const hasRange = selectedStartDate && selectedEndDate;

    const handleAddDayNote = (text: string, color: NoteColor) => {
        setNote({ type: 'day', date: displayDate, text, color });
        setAddingDay(false);
    };

    const handleAddRangeNote = (text: string, color: NoteColor) => {
        if (!selectedStartDate || !selectedEndDate) return;
        setNote({
            type: 'range',
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            text,
            color,
        });
        setAddingRange(false);
    };

    const handleAddMonthNote = (text: string, color: NoteColor) => {
        const monthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
        setNote({ type: 'month', month: monthKey, text, color });
        setAddingMonth(false);
    };

    if (!isNotesPanelOpen) {
        return (
            <button
            onClick={toggleNotesPanel}
            className="flex items-center gap-2 w-full p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Open notes panel"
            >
                <BookOpen size={14} />
                <span className="text-xs font-sans font-medium">Notes</span>
                {notes.length > 0 && (
                    <span className="ml-auto text-xs font-sans bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                        {notes.length}
                    </span>
                )}
            </button>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <BookOpen size={15} className="text-muted-foreground" />
                    <h3 className="font-serif text-base font-semibold text-foreground">Notes</h3>
                </div>
                <button
                onClick={toggleNotesPanel}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Close notes panel"
                >
                    <X size={14} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                <Section
                title={activeNoteDate ? formatDisplayDate(activeNoteDate) : 'Today'}
                icon={<Calendar size={12} />}
                count={dayNotes.length}
                defaultOpen
                >
                    <div className="space-y-2">
                        <AnimatePresence>
                            {dayNotes.map(note => (
                                <NoteCard
                                key={note.id}
                                note={note}
                                onDelete={deleteNote}
                                onUpdate={updateNote}
                                />
                            ))}
                        </AnimatePresence>
                        <AnimatePresence>
                            {addingDay && (
                                <AddNoteForm
                                onAdd={handleAddDayNote}
                                onCancel={() => setAddingDay(false)}
                                placeholder="Note for this day..."
                                />
                            )}
                        </AnimatePresence>
                        {!addingDay && (
                            <button
                            onClick={() => setAddingDay(true)}
                            className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground hover:text-primary transition-colors py-1"
                            >
                                <Plus size={12} />
                                Add Day Note
                            </button>
                        )}
                    </div>
                </Section>

                {hasRange && (
                    <Section
                    title={`Range: ${getRangeLabel(selectedStartDate!, selectedEndDate!)}`}
                    icon={<Layers size={12} />}
                    count={rangeNotes.filter(n =>
                    n.startDate === selectedStartDate && n.endDate === selectedEndDate
                    ).length}
                    defaultOpen
                    >
                        <div className="space-y-2">
                            <AnimatePresence>
                                {rangeNotes
                                .filter(n => n.startDate === selectedStartDate && n.endDate === selectedEndDate)
                                .map(note => (
                                    <NoteCard
                                    key={note.id}
                                    note={note}
                                    onDelete={deleteNote}
                                    onUpdate={updateNote}
                                    />
                                ))}
                            </AnimatePresence>
                            <AnimatePresence>
                                {addingRange && (
                                    <AddNoteForm
                                    onAdd={handleAddRangeNote}
                                    onCancel={() => setAddingRange(false)}
                                    placeholder="Note for this date range..."
                                    />
                                )}
                            </AnimatePresence>
                            {!addingRange && (
                                <button
                                onClick={() => setAddingRange(true)}
                                className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground hover:text-primary transition-colors py-1"
                                >
                                    <Plus size={12} />
                                    Add Range Note
                                </button>
                            )}
                        </div>
                    </Section>
                )}

                <Section
                title={`${MONTH_NAMES[currentMonth]} ${currentYear}`}
                icon={<BookOpen size={12} />}
                count={monthNote ? 1 : 0}
                defaultOpen={false}
                >
                    <div className="space-y-2">
                        {monthNote && (
                            <AnimatePresence>
                                <NoteCard
                                key={monthNote.id}
                                note={monthNote}
                                onDelete={deleteNote}
                                onUpdate={updateNote}
                                />
                            </AnimatePresence>
                        )}
                        <AnimatePresence>
                            {addingMonth && (
                                <AddNoteForm
                                onAdd={handleAddMonthNote}
                                onCancel={() => setAddingMonth(false)}
                                placeholder="Monthly note or goal..."
                                />
                            )}
                        </AnimatePresence>
                        {!addingMonth && !monthNote && (
                            <button
                                onClick={() => setAddingMonth(true)}
                                className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground hover:text-primary transition-colors py-1"
                            >
                                <Plus size={12} />
                                Add Monthly Note
                            </button>
                        )}
                    </div>
                </Section>

                {rangeNotes.length > 0 && (
                    <Section
                    title="All Range Notes"
                    icon={<Layers size={12} />}
                    count={rangeNotes.length}
                    defaultOpen={false}
                    >
                        <div className="space-y-2">
                            <AnimatePresence>
                                {rangeNotes.map(note => (
                                    <div key={note.id}>
                                        {note.startDate && note.endDate && (
                                            <p className="text-xs font-sans text-muted-foreground mb-1 pl-4">
                                                {getRangeLabel(note.startDate, note.endDate)}
                                            </p>
                                        )}
                                        <NoteCard
                                        note={note}
                                        onDelete={deleteNote}
                                        onUpdate={updateNote}
                                        />
                                    </div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </Section>
                )}
            </div>

            <div className="mt-3 pt-3 border-t border-border/60">
                <p className="text-xs font-sans text-muted-foreground/60 italic">
                    Click a Date To Add Notes. Notes Are Saved Automatically.
                </p>
            </div>
        </div>
    );
}
