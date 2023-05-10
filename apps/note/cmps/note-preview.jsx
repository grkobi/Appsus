

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
    // const {  info: { txt }, type } = note
    console.log('noteeeee', note)
    return (
        <article className="note-preview">
            <h4>{note.info.txt}</h4>
        </article>
    )
}

