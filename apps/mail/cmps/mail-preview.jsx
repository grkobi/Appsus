export function MailPreview({ mail }) {
    return (
        <article className="mail-preview flex ">
            <p>{mail.from}</p>
            <p>{mail.subject}</p>
            <p>{mail.body}</p>
        </article>
    )
}