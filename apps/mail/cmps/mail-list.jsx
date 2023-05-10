import { MailPreview } from '/mail-preview.jsx'


export function MailList({ mails}) {
    return (
        <ul className="mail-list clean-list">
            {mails.map(mail => <li key={mail.id}><MailPreview  mail={mail} /></li> )}
        </ul>
    )
}
