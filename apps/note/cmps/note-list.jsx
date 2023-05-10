import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, loadNotes }) {
    return (
        <div className="notes-list">
            {notes.map(note => <NotePreview note={note} loadNotes={loadNotes} />)}
        </div>
    )
}
