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
        const noteData = target.noteData ? target.noteData.value : '';
        target.txt.value = ''
        if (noteData) target.noteData.value = ''
        const note = noteService.createNote(noteType, textInput, noteData);
        console.log('NOTE', note)
        onNewNote(note)
    }




    return (

        <form onSubmit={handleSubmitNote}>
            <section>
                <div>
                    <input type="text"
                        id="txt"
                        name="txt"
                        placeholder={noteType === 'Enter text'}
                    />
                    {noteType !== 'note-txt' ? <input className="note-data" placeholder={PLACEHOLDER[noteType]} type='text' id='noteData' name='noteData' /> : null}
                </div>
                <div className="options-container">
                    <label htmlFor="note-txt"></label>
                    <input type="radio" name="note-type" id="note-txt" />
                </div>

                <button>add note</button>
            </section>
        </form>
        // <div>
        //     <input ref={inputRef} type="text" id="note" placeholder="Type a new note"></input>
        //     <button onClick={() => onAddNote(inputRef.current)}>Add note</button>
        //     {console.log('useRef: ', inputRef.current)}
        // </div>

    )
}