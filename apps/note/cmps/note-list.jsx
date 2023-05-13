import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onRemoveNote, onPinNote }) {

    return (
        <div className="notes-list">
            {notes.map(note => 
            <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote}/>)}
        </div>
    )
}
