export function NoteVideo({ note }) {
    console.log(note)
    return (
        <article>
            <p>{note.info.url}</p>
            <p>{note.info.title}</p>
        </article>
    )

}