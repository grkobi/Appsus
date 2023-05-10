
export function NoteAdd({ onAddNote }) {
    const inputRef = useRef()
    return (
        <div>
            <input ref={inputRef} type="text" id="note" placeholder="Type a new note"></input>
            <button onClick={() => onAddNote(inputRef.current.text)}>Add note</button>
        </div>

    )
}