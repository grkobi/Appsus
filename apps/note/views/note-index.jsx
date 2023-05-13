const { useState, useEffect } = React

import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/note-filter.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState({})
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy, newNote])

    function onFilterBy(filter) {
        setFilterBy({ ...filterBy, ...filter })
        loadNotes()

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
    }

    function onNewNote(note) {
        setNewNote(note)
        onAddNote(note)
    }

    function onAddNote(newNote) {
        // if (!newNote.info.txt) return
        noteService.save(newNote)
            .then((note) => {
                notes.push(note)
                const updatedNotes = notes
                setNotes(updatedNotes)
                loadNotes()
            })
    }


    return (
        <section className="notes-index">
            <NoteAdd onNewNote={onNewNote} newNote={newNote} />
            <NoteFilter onFilterBy={onFilterBy} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
            {/* <NoteAdd onAddNote={onAddNote} notes={notes} /> */}
            {/* <NoteAdd onNewNote={onNewNote} newNote={newNote} /> */}
        </section>
    )
}
