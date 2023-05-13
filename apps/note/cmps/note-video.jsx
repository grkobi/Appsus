export function NoteVideo({ note }) {
    let idx = note.info.url.indexOf('=')
    // const urlCode = note.info.url.substring(idx + 1)
    // const newUrl = `https://www.youtube.com/embed/${urlCode}`
    return (
        <React.Fragment>
            <div className="note-video">
                <p>{note.info.title}</p>
                <iframe width="350" height="150" src={note.info.url}></iframe>
            </div>
        </React.Fragment>
    )

}