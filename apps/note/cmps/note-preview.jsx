const { useEffect, useState } = React

import { NoteTxt } from "./note-txt.jsx"
import { NoteImg } from "./note-img.jsx"
import { NoteVideo } from "./note-video.jsx"

import { utilService } from "../../../services/util.service.js"


export function NotePreview({ note, onRemoveNote }) {

    const { type } = note
    const [color, setColor] = useState('#DE3163')

    const click = color => {
        note.style.backgroundColor = utilService.getRandomColor()
        setColor(color)
    }

    useEffect(() => {
    }, [color])

    function typeToDisplay() {
        switch (type) {
            case "note-txt":
                return <NoteTxt note={note} />
            case "note-img":
                return <NoteImg note={note} />
            case "note-video":
                return <NoteVideo note={note} />
            default:
                return <div>Unable to find a note component {type}</div>
        }
    }

    return (
        <section className='note-preview' style={{ backgroundColor: note.style.backgroundColor ? note.style.backgroundColor : '#00DDFF' }}>
            {typeToDisplay()}
            {/* <input className="btn-color" type="color" value="#ffffff" onChange={() => { this.setColor(event) }}></input> */}
            {/* <button  onClick={() => onChangeColor(note.id)}><i className="fa-solid fa-palette"></i></button> */}
            <button onClick={() => onRemoveNote(note.id)} className="remove-note"><i class="fa-solid fa-trash"></i></button>
            <button onClick={() => click(["#F08080","#FFAC1C","blue"])} className="change-color"><i className="fa-solid fa-palette"></i></button>
        </section>
    )
}

