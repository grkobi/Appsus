import { noteService } from "../services/note.service.js";
const { useState } = React;

export function NoteFilter({ onFilterBy }) {
    const [text, setText] = useState('')

    function onChangeType(ev) {
        onFilterBy({ type: ev.target.value })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onFilterBy({ text: text })
    }

    return (
        <section className="note-filter">
            <form className="text-filter-form" onSubmit={onSubmitFilter}>
                <input className="input-filter" type="text" id="txt"
                    name="txt" value={text} onChange={(ev) => setText(ev.target.value)} placeholder="Search for a note" />
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <select onChange={onChangeType}>
                <option value=''>All</option>
                <option value='note-txt'>Text</option>
                <option value='note-img'>Image</option>
                <option value='note-vid'>Video</option>
                <option value='note-todos'>Todos</option>
            </select>
        </section>
    )


}