import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes }) {
    return (
        <div className="notes-list">
            {notes.map(note => <NotePreview note={note} />)}
        </div>
    )
}
