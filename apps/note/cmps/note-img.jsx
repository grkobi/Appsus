export function NoteImg({ note }) {
    // console.log(note)
    return (
        <div className="note-img" >
            <h4>{note.info.title}</h4>
            <div className='img-container'>
                <img className="img-preview" src={note.info.url} alt="" />
            </div>
        </div>
    )

}