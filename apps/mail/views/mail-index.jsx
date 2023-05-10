const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { SearchFilter } from "../cmps/mail-filter.jsx"
import { SideFilter } from "../cmps/mail-filter.jsx"

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    console.log('mails', mails)
    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            })
    }

    function onDeleteMail(mailId) {
        mailService.deleteEmail(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
        })
    }


    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    if (!mails) return <div>Loading...</div>
    
    return <section className="mail-index">
        <SearchFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <SideFilter onSetFilter={onSetFilter} filterBy={filterBy}/>
        <MailList mails={mails} onDeleteMail={onDeleteMail} />
        </section>
}

