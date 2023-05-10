const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState([])
    console.log('mails', mails)
    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
    }
    if (!mails) return <div>Loading...</div>
    
    return <section className="mail-list-container">
        <MailList mails={mails} />
        </section>
}

