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

    function onPinNote(noteId) {
        setNotes(prev => {
            const noteIndex = prev.findIndex(note => note.id === noteId);
            return  [
                prev[noteIndex],
                ...prev.slice(0, noteIndex),
                ...prev.slice(noteIndex + 1)
            ] 
        })

        // const noteIndex = notes.findIndex(note => note.id === noteId);
        // const newNotes = [
        //     notes[noteIndex],
        //     ...notes.slice(0, noteIndex),
        //     ...notes.slice(noteIndex + 1)
        // ]
        // setNotes(newNotes)

        // const pinnedNote = notes[noteIndex];
        // notes.splice(noteIndex, 1);
        // notes.unshift(pinnedNote);
        // setNotes([...notes]);
    }


    return (
        <section className="notes-index">
            <NoteAdd onNewNote={onNewNote} newNote={newNote} />
            <NoteFilter onFilterBy={onFilterBy} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onPinNote={onPinNote} />
        </section>
    )
}
