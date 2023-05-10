import { MailPreview } from '/mail-preview.jsx'
import { mailService } from '../services/mail.service.js'


export function MailList({ mails, onDeleteMail}) {



    function toggleIsStarred(mailId) {
        mailService.toggleIsStarred(mailId)
    }

    function toggleIsImportant(mailId) {
        mailService.toggleIsImportant(mailId)
    }

    function toggleIsRead(mailId) {
        mailService.toggleIsRead(mailId)
    }

    
    return (
        <ul className="mail-list clean-list">
            {mails.map(mail => <li key={mail.id}>
                <button className={mail.isStarred ? 'starred' : ''} onClick={() => {toggleIsStarred(mail.id)}}>star</button>
                <button onClick={() => {toggleIsImportant(mail.id)}}>important</button>
                <MailPreview  mail={mail} />
                <button onClick={() => {toggleIsRead(mail.id)}}>mark as read</button>
                <button onClick={() => {onDeleteMail(mail.id)}}>delete</button>

                </li> )}
        </ul>
    )
}
