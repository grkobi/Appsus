const { useState, useEffect } = React

export function SearchFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    // const [searchBy, setSearchBy] = useState('')

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setFilterByToEdit({ ...filterByToEdit, [field]: value })
    }
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    

    return <section className="search-filter flex">
        <form className="search-form flex" onSubmit={onSubmitFilter}>
            <input value={filterByToEdit.txt} onChange={handleChange} name="txt" type="text" placeholder="Search mail"  />
            <button type="submit">Submit</button>
        </form>
    </section>
}

export function SideFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    

    

    return <section className="folder-filter">
        <ul className="side-bar-items clean-list">
            <li className="side-bar-item"><button onClick={() => setFilterByToEdit({ ...filterByToEdit, folder: 'inbox' })}>Inbox</button></li>
            <li className="side-bar-item"><button onClick={() => setFilterByToEdit({ ...filterByToEdit, folder: 'starred' })}>Starred</button></li>
            <li className="side-bar-item"><button onClick={() => setFilterByToEdit({ ...filterByToEdit, folder: 'sent' })}>Sent</button></li>
            <li className="side-bar-item"><button onClick={() => setFilterByToEdit({ ...filterByToEdit, folder: 'drafts' })}>Drafts</button></li>
            <li className="side-bar-item"><button onClick={() => setFilterByToEdit({ ...filterByToEdit, folder: 'trash' })}>Trash</button></li>
        </ul>
    </section>
}