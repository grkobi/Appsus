export function NoteTxt({ note }) {
    // console.log(note)
    return (
        <p className="note-text">
            {note.info.txt}
        </p>
    )

}