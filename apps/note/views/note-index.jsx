const { useState, useEffect } = React

import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    const onSetFilter = (filterBy) => {
        setFilterBy(filterBy)
    }

    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => {
                setNotes(notes)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => noteId !== note.id)
            setNotes(updatedNotes)
            loadNotes()
        }

        )
        loadNotes()
    }

    function onAddNote() {
        console.log('add note')
    }



    return (
        <section className="notes-index">
            {/* <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
            <NoteAdd onAddNote={onAddNote} />
        </section>
    )
}
