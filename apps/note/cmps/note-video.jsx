export function NoteVideo({ note }) {
    let idx = note.info.url.indexOf('=')
    // const urlCode = note.info.url.substring(idx + 1)
    // const newUrl = `https://www.youtube.com/embed/${urlCode}`
    return (
        <React.Fragment>
            <div className="note-video">
                <p>{note.info.title}</p>
                <iframe width="200" height="100" src={note.info.url}></iframe>
            </div>
        </React.Fragment>
    )

}