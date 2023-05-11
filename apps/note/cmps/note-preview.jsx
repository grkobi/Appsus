import { NoteTxt } from "./note-txt.jsx"
import { NoteImg } from "./note-img.jsx"
import { NoteVideo } from "./note-video.jsx"

// const typeToComponent = {
//     txt: NoteTxt,
//     img: NoteImg,
//     video: NoteVideo,
//     todo: NoteTodos
// }

export function NotePreview({ note }) {
    // const Component = typeToComponent[note.type]
    // return (
    //     <Component />
    // )

    const { type } = note
    console.log(note)
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
        <section className='note-preview'  style={{ backgroundColor: note.color ? note.color : '#00DDFF' }}>
        {typeToDisplay()}
        </section>
    )
}

