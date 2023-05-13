const { useState } = React
const { useRef } = React
import { noteService } from "../services/note.service.js"

export function NoteAdd({ onNewNote, newNote }) {
    // const inputRef = useRef()


    const [noteType, setNoteType] = useState('note-txt')

    function handleSubmitNote(ev) {
        ev.preventDefault()
        const { target } = ev;
        const textInput = target.txt.value;
        const noteData = target.value ? target.value : '';
        target.txt.value = ''
        if (noteData) target.noteData.value = ''
        const note = noteService.createNote(noteType, textInput, noteData);
        onNewNote(note)
    }

    return (
        <form onSubmit={handleSubmitNote} className="flex create-form">
            <section className="add-note-container">
                <div>

                    <textarea className="textarea-add-note" name="txt" placeholder="Enter your note..." />

                </div>
                <button className="save-note-btn" ><i class="fa-solid fa-plus"></i></button>
                <div className="options-container">
                    <label htmlFor="note-txt"><i class="fa-solid fa-font"></i></label>
                    <input type="radio" name="note-type" id="note-txt" defaultChecked />
                    <label htmlFor="note-img"><i class="fa-solid fa-image"></i></label>
                    <input type="radio" name="note-type" id="note-img" />
                    <label htmlFor="note-video"><i class="fa-solid fa-video"></i></label>
                    <input type="radio" name="note-type" id="note-video" />
                </div>
            </section>
        </form>
    )
}