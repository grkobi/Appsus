const { useState, useEffect } = React

import { NoteAdd } from "../cmps/note-add.jsx"

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

    }

    function onRemoveNote() {

    }

    function onAddNote(){
        console.log('add note')
    }



    return (
        <section className="notes-index">
            <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <NoteList  />
            <NoteAdd onAddNote={onAddNote} />
        </section>
    )
}
