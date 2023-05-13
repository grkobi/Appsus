const { useState, useEffect } = React

import { MailPreview } from '/mail-preview.jsx'
import { mailService } from '../services/mail.service.js'
import { MailDetails } from './mail-details.jsx'



export function MailList({ mails, onDeleteMail, onToggle}) {

    const [areMailDetailsOpen, setAreMailDetailsOpen] = useState(false)
    const [mailDetails, setMailDetails] = useState(null)

    // useEffect(() => {
    //     console.log('mails', mails)
    // }, [mails])


    function openDetails(mail) {
        setMailDetails(mail)
        setAreMailDetailsOpen(true)
    }

    return (
        <ul className="mail-list clean-list">
            {mails.map(mail => <li onDoubleClick={() => {openDetails(mail)}} className={`mail-list-item ${mail.isRead ? 'is-read' : ''}`} key={mail.id}>
                <button  onClick={() => { onToggle.onToggleIsStarred(mail.id) }}>
                    {mail.isStarred ? (
                        <img src="assets/img/mailIcons/asset63.png" alt="Starred" />
                    ) : (
                        <img src="assets/img/mailIcons/asset26.png" alt="Unstarred" />
                    )}
                    </button>
                <button onClick={() => { onToggle.onToggleIsImportant(mail.id) }}>
                    {mail.labels.includes('important') ? (
                        <img src="assets/img/mailIcons/asset64.png" alt="Important" />
                    ) : (
                        <img src="assets/img/mailIcons/asset28.png" alt="Unimportant" />
                    )}
                    </button>
                <MailPreview mail={mail} />
                <button onClick={() => { onToggle.onToggleIsRead(mail.id) }}>
                {mail.isRead ? (
                        <img src="assets/img/mailIcons/asset51.png" alt="Read" />
                    ) : (
                        <img src="assets/img/mailIcons/asset52.png" alt="Unread" />
                    )}
                </button>
                <button onClick={() => { onDeleteMail(mail.id, mail.folder) }}><img src="assets/img/mailIcons/asset50.png" /></button>

            </li>)}
            {areMailDetailsOpen && (
            <MailDetails onClose={() => setAreMailDetailsOpen(false)} mailDetails={mailDetails} />
        )}
        </ul>
    )
}
