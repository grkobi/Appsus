import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes }) {

    // function dynNoteCmp(note){
    //    if (type === 'noteVide') return <NoteVidPreview/>
    // }
    return (
        <div className="notes-list">
            {notes.map(note => <NotePreview key={note.id} note={note} />)}
        </div>
    )
}
