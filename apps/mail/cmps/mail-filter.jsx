const { useState, useEffect } = React



export function SearchFilter({ searchBy, onSetSearch }) {
    const [searchByTxt, setSearchByTxt] = useState(searchBy)
    // console.log('searchByToEdit', searchByToEdit)

    useEffect(() => {
        onSetSearch(searchByTxt)
    }, [searchByTxt])

    function handleChange(ev) {
        const value = ev.target.value
        setSearchByTxt(value)
    }

    function onSubmitSearch(ev) {
        ev.preventDefault()
        onSetSearch(searchByTxt)
    }

    return <section className="search-filter flex">
        <form className="search-form flex" onSubmit={onSubmitSearch}>
            <input className="search-input" value={searchByTxt} onChange={handleChange} name="txt" type="text" placeholder="Search mail" />
            <button type="submit">Submit</button>
        </form>
    </section>

}


export function SideFilter({ filterBy, onSetFilter, mailsCount }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    // console.log('side filter: filterByToEdit', filterByToEdit)
    
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleClick(ev) {
        // console.log('ev.target', ev.target)
        const field = ev.target.name
        const value = ev.target.value
        setFilterByToEdit({ ...filterByToEdit, [field]: value })
    }

    const { folder } = filterByToEdit

    return <section className="folder-filter">
        <ul className="side-bar-items clean-list">
            <li className="side-bar-item"><button name="folder" className={folder === 'inbox' ? 'active' : ''} value={'inbox'} onClick={handleClick}>{`Inbox ${mailsCount.inbox}`}</button></li>
            <li className="side-bar-item"><button name="folder" className={folder === 'starred' ? 'active' : ''} value={'starred'} onClick={handleClick}>{`Starred ${mailsCount.starred}`}</button></li>
            <li className="side-bar-item"><button name="folder" className={folder === 'sent' ? 'active' : ''} value={'sent'} onClick={handleClick}>{`Sent ${mailsCount.sent}`}</button></li>
            <li className="side-bar-item"><button name="folder" className={folder === 'drafts' ? 'active' : ''} value={'draft'} onClick={handleClick}>{`Drafts ${mailsCount.draft}`}</button></li>
            <li className="side-bar-item"><button name="folder" className={folder === 'trash' ? 'active' : ''} value={'trash'} onClick={handleClick}>{`Trash ${mailsCount.trash}`}</button></li>
        </ul>
    </section>
}