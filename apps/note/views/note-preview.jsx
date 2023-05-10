

const typeToComponent = {
    txt: NoteTxt,
    img: NoteImg,
    video: NoteVideo,
    todo: NoteTodos
}

export function NotePreview({ note }) {
    const Component = typeToComponent[note.type]
    return (
        <Component />
    )
}

